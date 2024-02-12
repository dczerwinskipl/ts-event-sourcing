"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decide = exports.CART_ALREADY_EXISTS = void 0;
const asserts_1 = require("../asserts");
exports.CART_ALREADY_EXISTS = "CART_ALREADY_EXISTS";
const decide = (shoppingCart, { data }) => {
    (0, asserts_1.assertNotInitialized)(shoppingCart);
    return {
        type: "ShoppingCartOpened",
        data: {
            shoppingCartId: data.shoppingCartId,
            clientId: data.clientId,
            openedAt: new Date().toJSON(),
        },
    };
};
exports.decide = decide;
