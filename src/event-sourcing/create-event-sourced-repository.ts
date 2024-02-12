import { Aggregate, Event } from "@app/core";
import {
  EventSourcedAggregate,
  EventSourcedRepository,
} from "./event-sourced-aggregate";
import { getEvents } from "./event-store";
import { Decider, EventStore } from "./types";

export const createEventSourcedAggregate = <
  S extends Aggregate,
  E extends Event,
  A extends EventSourcedAggregate<S, E>
>(
  state: S,
  events: E[],
  newEvents: E[] = []
): A =>
  ({
    ...state,
    uncommitedEvents: newEvents,
    events: [...events],
    appendEvents(newEvents: E[]) {
      this.uncommitedEvents = [...this.uncommitedEvents, ...newEvents];
    },
    flushEvents() {
      const events = this.uncommitedEvents;
      this.uncommitedEvents = [];
      return events;
    },
  } as A);

export const createEventSourcedRepository = <
  S extends Aggregate,
  E extends Event,
  A extends EventSourcedAggregate<S, E>
>(
  decider: Decider<S, any, E>,
  eventStore: EventStore<E>
): EventSourcedRepository<S, E, A> => ({
  findState: async (id) => {
    const events = await getEvents(eventStore, id);

    if (!events || events.length == 0) {
      return null;
    }

    return events.reduce<S>(decider.evolve, decider.getInitialState());
  },
  find: async (id) => {
    const events = await getEvents(eventStore, id);

    if (!events || events.length == 0) {
      return null;
    }

    const state = events.reduce<S>(decider.evolve, decider.getInitialState());

    return createEventSourcedAggregate<S, E, A>(state, events);
  },
  save: async (item) => {
    const toAppend = item.flushEvents();
    await eventStore.appendToStream(item.id, toAppend);
  },
});
