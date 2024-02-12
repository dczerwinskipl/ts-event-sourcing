"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evolve = void 0;
const merge_1 = require("../../utils/merge");
const evolve = (state, event) => {
    switch (event.type) {
        case "ShoppingCartOpened":
            if (state.status != "Empty")
                return state;
            return {
                id: event.data.shoppingCartId,
                clientId: event.data.clientId,
                productItems: [],
                status: "Pending",
            };
        case "ProductItemAddedToShoppingCart": {
            if (state.status != "Pending")
                return state;
            const { productItems } = state;
            const { data: { productItem }, } = event;
            return {
                ...state,
                productItems: (0, merge_1.merge)(productItems, productItem, (p) => p.productId === productItem.productId &&
                    p.unitPrice === productItem.unitPrice, (p) => {
                    return {
                        ...p,
                        quantity: p.quantity + productItem.quantity,
                    };
                }, () => productItem),
            };
        }
        case "ProductItemRemovedFromShoppingCart": {
            if (state.status != "Pending")
                return state;
            const { productItems } = state;
            const { data: { productItem }, } = event;
            return {
                ...state,
                productItems: (0, merge_1.merge)(productItems, productItem, (p) => p.productId === productItem.productId &&
                    p.unitPrice === productItem.unitPrice, (p) => {
                    return {
                        ...p,
                        quantity: p.quantity - productItem.quantity,
                    };
                }),
            };
        }
        case "ShoppingCartConfirmed":
            if (state.status != "Pending")
                return state;
            return {
                ...state,
                status: "Confirmed",
                confirmedAt: new Date(event.data.confirmedAt),
            };
        case "ShoppingCartCanceled":
            if (state.status != "Pending")
                return state;
            return {
                ...state,
                status: "Canceled",
                canceledAt: new Date(event.data.canceledAt),
            };
        default: {
            const _ = event;
            return state;
        }
    }
};
exports.evolve = evolve;
