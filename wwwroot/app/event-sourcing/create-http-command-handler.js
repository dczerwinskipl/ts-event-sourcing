"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpCommandHandler = void 0;
const createHttpCommandHandler = (handleCommand) => (mapRequest, urlPrefix) => (request, response, next) => {
    mapRequest(request, async (recordId, command) => {
        const result = await handleCommand(recordId, command);
        return mapToResponse(response, recordId, result, urlPrefix);
    }).catch(next);
};
exports.createHttpCommandHandler = createHttpCommandHandler;
const mapToResponse = (response, recordId, result, urlPrefix) => {
    if (result === "NOT_INITIALIZED") {
        sendNotFound(response);
        return;
    }
    sendCreated(response, recordId, urlPrefix);
    return;
};
const sendCreated = (response, createdId, urlPrefix) => {
    response.setHeader("Location", `${urlPrefix ?? response.req.url}/${createdId}`);
    response.status(201).json({ id: createdId });
};
const sendNotFound = (response) => {
    response.sendStatus(404);
};
