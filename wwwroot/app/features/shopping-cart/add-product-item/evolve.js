"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evolve = void 0;
const utils_1 = require("@app/utils");
const evolve = (state, event) => {
    if (state.status != "Pending")
        return state;
    const { productItems } = state;
    const { data: { productItem }, } = event;
    return {
        ...state,
        productItems: (0, utils_1.merge)(productItems, productItem, (p) => p.productId === productItem.productId, (p) => {
            return {
                ...p,
                quantity: p.quantity + productItem.quantity,
            };
        }, () => productItem),
    };
};
exports.evolve = evolve;
