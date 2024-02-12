"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommandHandler = void 0;
const create_event_sourced_repository_1 = require("./create-event-sourced-repository");
const errors_1 = require("./errors");
const createCommandHandler = (repository, decider, ...eventHandlers) => async (recordId, command) => {
    const aggregate = await repository.find(recordId);
    const state = aggregate ?? decider.getInitialState();
    try {
        const newEvents = (() => {
            const events = decider.decide(state, command);
            return Array.isArray(events) ? events : [events];
        })();
        const newState = newEvents.reduce(decider.evolve, state ?? decider.getInitialState());
        const newAggregate = (0, create_event_sourced_repository_1.createEventSourcedAggregate)(newState, aggregate?.events ?? [], [...(aggregate?.uncommitedEvents ?? []), ...newEvents]);
        await repository.save(newAggregate);
        await Promise.all(newEvents.map(async (event) => await Promise.all(eventHandlers.map(async (eventHandler) => await eventHandler(newState, event)))));
    }
    catch (error) {
        if (error instanceof errors_1.NotInitializedError) {
            return error.type;
        }
        throw error;
    }
};
exports.createCommandHandler = createCommandHandler;
