"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAggregateEventHandler = void 0;
function isKnownEventType(event, handlersMap) {
    return event.type in handlersMap;
}
const createAggregateEventHandler = (handlersMap) => async (state, event) => {
    if (!isKnownEventType(event, handlersMap)) {
        return;
    }
    const handler = handlersMap[event.type];
    return await handler(state, event);
};
exports.createAggregateEventHandler = createAggregateEventHandler;
