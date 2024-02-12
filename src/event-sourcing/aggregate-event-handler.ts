import { Aggregate, Event } from "@app/core";
import { Context } from "@app/core/context";

export type AggregateEventHandler<S extends Aggregate, E extends Event> = (
  state: S,
  event: E,
  context: Context
) => Promise<void>;

export type AggregateEventHandlersMap<
  S extends Aggregate,
  E extends Event
> = Partial<{
  [K in E["type"]]: AggregateEventHandler<S, Extract<E, { type: K }>>;
}>;

function isKnownEventType<S extends Aggregate, E extends Event>(
  event: E,
  handlersMap: AggregateEventHandlersMap<S, E>
): event is E & { type: keyof AggregateEventHandlersMap<S, E> } {
  return event.type in handlersMap;
}

export const createAggregateEventHandler =
  <S extends Aggregate, E extends Event>(
    handlersMap: AggregateEventHandlersMap<S, E>
  ): AggregateEventHandler<S, E> =>
  async (state, event, context) => {
    if (!isKnownEventType(event, handlersMap)) {
      return;
    }

    const handler = handlersMap[event.type]!;
    return await handler(state, event as any, context);
  };
