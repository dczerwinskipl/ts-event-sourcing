"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIntegrationEventsProducer = void 0;
const event_sourcing_1 = require("@app/event-sourcing");
const asserts_1 = require("./asserts");
const createIntegrationEventsProducer = (messageBus) => (0, event_sourcing_1.createAggregateEventHandler)({
    ShoppingCartOpened: async (state, event) => {
        (0, asserts_1.assertInitialized)(state);
        return await messageBus.publish({
            type: "ShoppingCartCreated",
            data: {
                shoppingCartId: event.data.shoppingCartId,
                clientId: state.clientId,
            },
        });
    },
    ShoppingCartConfirmed: async (state, event) => {
        (0, asserts_1.assertInitialized)(state);
        return await messageBus.publish({
            type: "ShoppingCartConfirmed",
            data: {
                shoppingCartId: event.data.shoppingCartId,
                clientId: state.clientId,
                productItems: state.productItems.map((p) => ({ ...p })),
            },
        });
    },
});
exports.createIntegrationEventsProducer = createIntegrationEventsProducer;
