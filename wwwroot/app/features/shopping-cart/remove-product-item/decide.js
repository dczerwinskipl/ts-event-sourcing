"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decide = exports.PRODUCT_ITEM_QUANTITY = exports.PRODUCT_ITEM_NOT_FOUND = void 0;
const asserts_1 = require("../asserts");
exports.PRODUCT_ITEM_NOT_FOUND = "PRODUCT_ITEM_NOT_FOUND";
exports.PRODUCT_ITEM_QUANTITY = "PRODUCT_ITEM_QUANTITY";
const assertProductItemExists = (productItems, { productId, quantity }) => {
    const current = productItems.find((pi) => pi.productId === productId);
    if (!current) {
        throw exports.PRODUCT_ITEM_NOT_FOUND;
    }
    if (current.quantity < quantity) {
        throw `${exports.PRODUCT_ITEM_QUANTITY}, max value: ${current.quantity}`;
    }
    return current;
};
const assertProductItemQuantity = (current, { quantity }) => {
    if (current.quantity < quantity) {
        throw `${exports.PRODUCT_ITEM_QUANTITY}, max value: ${current.quantity}`;
    }
    return current;
};
const decide = (shoppingCart, { data }) => {
    (0, asserts_1.assertInitialized)(shoppingCart);
    (0, asserts_1.assertCartOpen)(shoppingCart);
    const currentProductItem = assertProductItemExists(shoppingCart.productItems, data.productItem);
    assertProductItemQuantity(currentProductItem, data.productItem);
    return {
        type: "ProductItemRemovedFromShoppingCart",
        data: {
            shoppingCartId: data.shoppingCartId,
            productItem: data.productItem,
        },
    };
};
exports.decide = decide;
