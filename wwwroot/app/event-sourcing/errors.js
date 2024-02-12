"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotInitializedError = void 0;
class NotInitializedError extends Error {
    type;
    constructor() {
        super(`Not initialized`);
        this.type = "NOT_INITIALIZED";
    }
}
exports.NotInitializedError = NotInitializedError;
