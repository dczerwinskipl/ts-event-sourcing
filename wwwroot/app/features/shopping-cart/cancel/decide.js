"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decide = void 0;
const asserts_1 = require("../asserts");
const decide = (shoppingCart, { data }) => {
    (0, asserts_1.assertCartOpen)(shoppingCart);
    return {
        type: "ShoppingCartCanceled",
        data: {
            shoppingCartId: data.shoppingCartId,
            canceledAt: new Date().toJSON(),
        },
    };
};
exports.decide = decide;
