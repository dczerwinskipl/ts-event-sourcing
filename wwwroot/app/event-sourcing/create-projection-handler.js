"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectionHandler = void 0;
const createProjectionHandler = (repository) => async (recordId) => await repository.findState(recordId);
exports.createProjectionHandler = createProjectionHandler;
