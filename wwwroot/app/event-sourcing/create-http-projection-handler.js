"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpProjectionHandler = void 0;
const createHttpProjectionHandler = (getProjection) => (mapRequest) => (request, response, next) => {
    mapRequest(request, async (recordId) => {
        const result = await getProjection(recordId);
        return mapToResponse(response, result);
    }).catch(next);
};
exports.createHttpProjectionHandler = createHttpProjectionHandler;
const mapToResponse = (response, result) => {
    if (!result) {
        sendNotFound(response);
        return;
    }
    sendOk(response, result);
    return;
};
const sendNotFound = (response) => {
    response.sendStatus(404);
};
const sendOk = (response, result) => {
    response.status(200).json(result);
};
