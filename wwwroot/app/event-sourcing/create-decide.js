"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDecide = exports.UNKNOWN_COMMAND_TYPE = void 0;
exports.UNKNOWN_COMMAND_TYPE = "UNKNOWN_COMMAND_TYPE";
function isKnownCommandType(command, decidersMap) {
    return command.type in decidersMap;
}
const createDecide = (decidersMap) => (state, command) => {
    if (!isKnownCommandType(command, decidersMap)) {
        throw new Error(exports.UNKNOWN_COMMAND_TYPE);
    }
    const handler = decidersMap[command.type];
    return handler(state, command);
};
exports.createDecide = createDecide;
