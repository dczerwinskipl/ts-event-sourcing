"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evolve = void 0;
const evolve = (state, event) => {
    if (state.status != "Empty")
        return state;
    return {
        id: event.data.shoppingCartId,
        clientId: event.data.clientId,
        productItems: [],
        status: "Pending",
    };
};
exports.evolve = evolve;
