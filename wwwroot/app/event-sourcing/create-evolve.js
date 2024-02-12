"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvolve = exports.UNKNOWN_EVENT_TYPE = void 0;
exports.UNKNOWN_EVENT_TYPE = "UNKNOWN_EVENT_TYPE";
function isKnownEventType(event, decidersMap) {
    return event.type in decidersMap;
}
const createEvolve = (decidersMap) => (state, event) => {
    if (!isKnownEventType(event, decidersMap)) {
        throw new Error(exports.UNKNOWN_EVENT_TYPE);
    }
    const handler = decidersMap[event.type];
    return handler(state, event);
};
exports.createEvolve = createEvolve;
