"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertCartOpen = exports.assertNotInitialized = exports.assertInitialized = exports.CART_ALREADY_EXISTS = exports.CART_IS_CLOSED = void 0;
const errors_1 = require("@app/event-sourcing/errors");
exports.CART_IS_CLOSED = "CART_IS_CLOSED";
exports.CART_ALREADY_EXISTS = "CART_ALREADY_EXISTS";
function assertInitialized(state) {
    if (state.status === "Empty") {
        throw new errors_1.NotInitializedError();
    }
}
exports.assertInitialized = assertInitialized;
function assertNotInitialized(state) {
    if (state.status !== "Empty") {
        throw exports.CART_ALREADY_EXISTS;
    }
}
exports.assertNotInitialized = assertNotInitialized;
function assertCartOpen(state) {
    if (state.status !== "Pending") {
        throw exports.CART_IS_CLOSED;
    }
}
exports.assertCartOpen = assertCartOpen;
