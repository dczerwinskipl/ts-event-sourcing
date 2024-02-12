"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decider = void 0;
const event_sourcing_1 = require("@app/event-sourcing");
const addProductItem = __importStar(require("./add-product-item"));
const cancel = __importStar(require("./cancel"));
const confirm = __importStar(require("./confirm"));
const open = __importStar(require("./open"));
const removeProductItem = __importStar(require("./remove-product-item"));
exports.decider = {
    decide: (0, event_sourcing_1.createDecide)({
        OpenShoppingCart: open.decide,
        AddProductItemToShoppingCart: addProductItem.decide,
        RemoveProductItemFromShoppingCart: removeProductItem.decide,
        ConfirmShoppingCart: confirm.decide,
        CancelShoppingCart: cancel.decide,
    }),
    evolve: (0, event_sourcing_1.createEvolve)({
        ShoppingCartOpened: open.evolve,
        ProductItemAddedToShoppingCart: addProductItem.evolve,
        ProductItemRemovedFromShoppingCart: removeProductItem.evolve,
        ShoppingCartConfirmed: confirm.evolve,
        ShoppingCartCanceled: cancel.evolve,
    }),
    getInitialState: () => ({
        id: "",
        status: "Empty",
    }),
};
