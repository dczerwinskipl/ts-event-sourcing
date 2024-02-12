"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const event_sourcing_1 = require("@app/event-sourcing");
const create_http_projection_handler_1 = require("@app/event-sourcing/create-http-projection-handler");
const create_projection_handler_1 = require("@app/event-sourcing/create-projection-handler");
const utils_1 = require("@app/utils");
const publisher_1 = require("kafka/publisher");
const uuid_1 = require("uuid");
const decider_1 = require("./decider");
const event_store_1 = require("./event-store");
const integrations_events_1 = require("./integrations-events");
const createShoppingCartCommandHandler = (getClient, aggregateEventHandler) => (0, event_sourcing_1.createCommandHandler)((0, event_store_1.createShoppingCartRepository)(getClient()), decider_1.decider, aggregateEventHandler);
const createShoppingCartHttpCommandHandler = (getClient, aggregateEventHandler) => (0, event_sourcing_1.createHttpCommandHandler)(createShoppingCartCommandHandler(getClient, aggregateEventHandler));
const createShoppingCartProjectionHandler = (getClient) => (0, create_projection_handler_1.createProjectionHandler)((0, event_store_1.createShoppingCartRepository)(getClient()));
const createShoppingCartHttpProjectionHandler = (getClient) => (0, create_http_projection_handler_1.createHttpProjectionHandler)(createShoppingCartProjectionHandler(getClient));
const registerRoutes = (router, prefix, getClient, getKafkaClient) => {
    const kafkaIntegrationEventsProducer = (0, integrations_events_1.createIntegrationEventsProducer)(new publisher_1.KafkaMessagePublisher(getKafkaClient(), {
        topic: "shopping-cart",
        getKey: ({ data: { shoppingCartId } }) => `@aggregate/ShoppingCart-${shoppingCartId}`,
    }));
    const onCommand = createShoppingCartHttpCommandHandler(getClient, kafkaIntegrationEventsProducer);
    const onGet = createShoppingCartHttpProjectionHandler(getClient);
    router.get(`${prefix}/clients/:clientId/shopping-carts/:shoppingCartId/`, onGet(async (request, handle) => {
        const shoppingCartId = (0, utils_1.assertNotEmptyString)(request.params.shoppingCartId);
        return await handle(shoppingCartId);
    }));
    router.post(`${prefix}/clients/:clientId/shopping-carts/`, onCommand(async (request, handle) => {
        const shoppingCartId = (0, uuid_1.v4)();
        return await handle(shoppingCartId, {
            type: "OpenShoppingCart",
            data: {
                shoppingCartId,
                clientId: (0, utils_1.assertNotEmptyString)(request.params.clientId, "clientId"),
            },
        });
    }));
    // Add Product Item
    router.post(`${prefix}/clients/:clientId/shopping-carts/:shoppingCartId/product-items`, onCommand((request, handle) => {
        const shoppingCartId = (0, utils_1.assertNotEmptyString)(request.params.shoppingCartId);
        return handle(shoppingCartId, {
            type: "AddProductItemToShoppingCart",
            data: {
                shoppingCartId: (0, utils_1.assertNotEmptyString)(request.params.shoppingCartId, "shoppingCartId"),
                productItem: {
                    productId: (0, utils_1.assertNotEmptyString)(request.body.productId, "productId"),
                    quantity: (0, utils_1.assertPositiveNumber)(request.body.quantity, "quantity"),
                },
            },
        });
    }));
    // Remove Product Item
    router.delete(`${prefix}/clients/:clientId/shopping-carts/:shoppingCartId/product-items`, onCommand((request, handle) => {
        const shoppingCartId = (0, utils_1.assertNotEmptyString)(request.params.shoppingCartId);
        return handle(shoppingCartId, {
            type: "RemoveProductItemFromShoppingCart",
            data: {
                shoppingCartId: (0, utils_1.assertNotEmptyString)(request.params.shoppingCartId, "shoppingCartId"),
                productItem: {
                    productId: (0, utils_1.assertNotEmptyString)(request.body.productId, "productId"),
                    quantity: (0, utils_1.assertPositiveNumber)(request.body.quantity, "quantity"),
                },
            },
        });
    }));
    // Confirm Shopping Cart
    router.put(`${prefix}/clients/:clientId/shopping-carts/:shoppingCartId`, onCommand((request, handle) => {
        const shoppingCartId = (0, utils_1.assertNotEmptyString)(request.params.shoppingCartId);
        return handle(shoppingCartId, {
            type: "ConfirmShoppingCart",
            data: {
                shoppingCartId: (0, utils_1.assertNotEmptyString)(request.params.shoppingCartId, "shoppingCartId"),
            },
        });
    }));
    // Confirm Shopping Cart
    router.delete(`${prefix}/clients/:clientId/shopping-carts/:shoppingCartId`, onCommand((request, handle) => {
        const shoppingCartId = (0, utils_1.assertNotEmptyString)(request.params.shoppingCartId);
        return handle(shoppingCartId, {
            type: "CancelShoppingCart",
            data: {
                shoppingCartId: (0, utils_1.assertNotEmptyString)(request.params.shoppingCartId, "shoppingCartId"),
            },
        });
    }));
};
exports.registerRoutes = registerRoutes;
