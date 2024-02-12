"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evolve = void 0;
const evolve = (state, event) => {
    if (state.status != "Pending")
        return state;
    return {
        ...state,
        status: "Canceled",
        canceledAt: new Date(event.data.canceledAt),
    };
};
exports.evolve = evolve;
