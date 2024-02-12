"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventSourcedRepository = exports.createEventSourcedAggregate = void 0;
const event_store_1 = require("./event-store");
const createEventSourcedAggregate = (state, events, newEvents = []) => ({
    ...state,
    uncommitedEvents: newEvents,
    events: [...events],
    appendEvents(newEvents) {
        this.uncommitedEvents = [...this.uncommitedEvents, ...newEvents];
    },
    flushEvents() {
        const events = this.uncommitedEvents;
        this.uncommitedEvents = [];
        return events;
    },
});
exports.createEventSourcedAggregate = createEventSourcedAggregate;
const createEventSourcedRepository = (decider, eventStore) => ({
    findState: async (id) => {
        const events = await (0, event_store_1.getEvents)(eventStore, id);
        if (!events || events.length == 0) {
            return null;
        }
        return events.reduce(decider.evolve, decider.getInitialState());
    },
    find: async (id) => {
        const events = await (0, event_store_1.getEvents)(eventStore, id);
        if (!events || events.length == 0) {
            return null;
        }
        const state = events.reduce(decider.evolve, decider.getInitialState());
        return (0, exports.createEventSourcedAggregate)(state, events);
    },
    save: async (item) => {
        const toAppend = item.flushEvents();
        await eventStore.appendToStream(item.id, toAppend);
    },
});
exports.createEventSourcedRepository = createEventSourcedRepository;
