"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.correlationIdMiddleware = void 0;
const uuid_1 = __importDefault(require("uuid"));
// Middleware to attach or generate a correlation ID
const correlationIdMiddleware = (req, res, next) => {
    let correlationId = req.headers["x-correlation-id"];
    // Ensure correlationId is a string
    if (Array.isArray(correlationId)) {
        correlationId = correlationId[0];
    }
    if (!correlationId) {
        correlationId = uuid_1.default.v4();
    }
    req.correlationId = correlationId;
    res.setHeader("X-Correlation-ID", correlationId);
    next();
};
exports.correlationIdMiddleware = correlationIdMiddleware;
