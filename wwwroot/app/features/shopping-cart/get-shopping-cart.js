"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShoppingCart = void 0;
const evolve_1 = require("./evolve");
const db_client_1 = require("@eventstore/db-client");
const getShoppingCart = async (shoppingCartEventStore, id) => {
    try {
        const events = await shoppingCartEventStore.readStream(id);
        const shoppingCart = events.reduce(evolve_1.evolve, {
            status: "Empty",
        });
        console.log("getShoppingCart", { shoppingCart });
        return shoppingCart;
    }
    catch (error) {
        if (error instanceof db_client_1.StreamNotFoundError) {
            console.log("Stream not found");
            return;
        }
        throw error;
    }
};
exports.getShoppingCart = getShoppingCart;
