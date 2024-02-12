import { Aggregate, Command, Event } from "@app/core";
import { Context } from "@app/core/context";
import { AggregateEventHandler } from "./aggregate-event-handler";
import { createEventSourcedAggregate } from "./create-event-sourced-repository";
import { NOT_INITIALIZED, NotInitializedError } from "./errors";
import {
  EventSourcedAggregate,
  EventSourcedRepository,
} from "./event-sourced-aggregate";
import { Decider } from "./types";

export const createCommandHandler =
  <
    S extends Aggregate,
    C extends Command,
    E extends Event,
    A extends EventSourcedAggregate<S, E>
  >(
    repository: EventSourcedRepository<S, E, A>,
    decider: Decider<S, C, E>,
    ...eventHandlers: AggregateEventHandler<S, E>[]
  ) =>
  async (
    recordId: string,
    command: C,
    context: Context
  ): Promise<void | NOT_INITIALIZED> => {
    const aggregate = await repository.find(recordId);
    const state: S = (aggregate as any) ?? decider.getInitialState();
    try {
      const newEvents = (() => {
        const events = decider.decide(state, command);
        return Array.isArray(events) ? events : [events];
      })();
      const newState = newEvents.reduce(
        decider.evolve,
        state ?? decider.getInitialState()
      );
      const newAggregate = createEventSourcedAggregate<S, E, A>(
        newState,
        aggregate?.events ?? [],
        [...(aggregate?.uncommitedEvents ?? []), ...newEvents]
      );

      await repository.save(newAggregate);

      await Promise.all(
        newEvents.map(
          async (event) =>
            await Promise.all(
              eventHandlers.map(
                async (eventHandler) =>
                  await eventHandler(newState, event, context)
              )
            )
        )
      );
    } catch (error) {
      if (error instanceof NotInitializedError) {
        return error.type;
      }
      throw error;
    }
  };
