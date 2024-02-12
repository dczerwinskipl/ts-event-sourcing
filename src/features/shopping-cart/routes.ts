import {
  AggregateEventHandler,
  createCommandHandler,
  createHttpCommandHandler,
} from "@app/event-sourcing";
import { createHttpProjectionHandler } from "@app/event-sourcing/create-http-projection-handler";
import { createProjectionHandler } from "@app/event-sourcing/create-projection-handler";
import { assertNotEmptyString, assertPositiveNumber } from "@app/utils";
import { EventStoreDBClient } from "@eventstore/db-client";
import { Router } from "express";
import { KafkaMessagePublisher } from "kafka/publisher";
import { Kafka } from "kafkajs";
import { v4 } from "uuid";
import { decider } from "./decider";
import { createShoppingCartRepository } from "./event-store";
import {
  ShoppingCartIntegrationEvent,
  createIntegrationEventsProducer,
} from "./integrations-events";
import {
  ShoppingCartCommand,
  ShoppingCartEvent,
  ShoppingCartState,
} from "./shopping-cart";

const createShoppingCartCommandHandler = (
  getClient: () => EventStoreDBClient,
  aggregateEventHandler: AggregateEventHandler<
    ShoppingCartState,
    ShoppingCartEvent
  >
) =>
  createCommandHandler(
    createShoppingCartRepository(getClient()),
    decider,
    aggregateEventHandler
  );

const createShoppingCartHttpCommandHandler = (
  getClient: () => EventStoreDBClient,
  aggregateEventHandler: AggregateEventHandler<
    ShoppingCartState,
    ShoppingCartEvent
  >
) =>
  createHttpCommandHandler<ShoppingCartCommand>(
    createShoppingCartCommandHandler(getClient, aggregateEventHandler)
  );

const createShoppingCartProjectionHandler = (
  getClient: () => EventStoreDBClient
) => createProjectionHandler(createShoppingCartRepository(getClient()));

const createShoppingCartHttpProjectionHandler = (
  getClient: () => EventStoreDBClient
) =>
  createHttpProjectionHandler<ShoppingCartState>(
    createShoppingCartProjectionHandler(getClient)
  );

export const registerRoutes = (
  router: Router,
  prefix: string,
  getClient: () => EventStoreDBClient,
  getKafkaClient: () => Kafka
): void => {
  const kafkaIntegrationEventsProducer = createIntegrationEventsProducer(
    new KafkaMessagePublisher<ShoppingCartIntegrationEvent>(getKafkaClient(), {
      topic: "shopping-cart",
      getKey: ({ data: { shoppingCartId } }) =>
        `@aggregate/ShoppingCart-${shoppingCartId}`,
    })
  );
  const onCommand = createShoppingCartHttpCommandHandler(
    getClient,
    kafkaIntegrationEventsProducer
  );
  const onGet = createShoppingCartHttpProjectionHandler(getClient);

  router.get(
    `${prefix}/clients/:clientId/shopping-carts/:shoppingCartId/`,
    onGet(async (request, handle) => {
      const shoppingCartId = assertNotEmptyString(
        request.params.shoppingCartId
      );

      return await handle(shoppingCartId);
    })
  );

  router.post(
    `${prefix}/clients/:clientId/shopping-carts/`,
    onCommand(async (request, handle) => {
      const shoppingCartId = v4();

      return await handle(shoppingCartId, {
        type: "OpenShoppingCart",
        data: {
          shoppingCartId,
          clientId: assertNotEmptyString(request.params.clientId, "clientId"),
        },
      });
    })
  );

  // Add Product Item
  router.post(
    `${prefix}/clients/:clientId/shopping-carts/:shoppingCartId/product-items`,
    onCommand((request, handle) => {
      const shoppingCartId = assertNotEmptyString(
        request.params.shoppingCartId
      );
      return handle(shoppingCartId, {
        type: "AddProductItemToShoppingCart",
        data: {
          shoppingCartId: assertNotEmptyString(
            request.params.shoppingCartId,
            "shoppingCartId"
          ),
          productItem: {
            productId: assertNotEmptyString(
              request.body.productId,
              "productId"
            ),
            quantity: assertPositiveNumber(request.body.quantity, "quantity"),
          },
        },
      });
    })
  );

  // Remove Product Item
  router.delete(
    `${prefix}/clients/:clientId/shopping-carts/:shoppingCartId/product-items`,
    onCommand((request, handle) => {
      const shoppingCartId = assertNotEmptyString(
        request.params.shoppingCartId
      );

      return handle(shoppingCartId, {
        type: "RemoveProductItemFromShoppingCart",
        data: {
          shoppingCartId: assertNotEmptyString(
            request.params.shoppingCartId,
            "shoppingCartId"
          ),
          productItem: {
            productId: assertNotEmptyString(
              request.body.productId,
              "productId"
            ),
            quantity: assertPositiveNumber(request.body.quantity, "quantity"),
          },
        },
      });
    })
  );

  // Confirm Shopping Cart
  router.put(
    `${prefix}/clients/:clientId/shopping-carts/:shoppingCartId`,
    onCommand((request, handle) => {
      const shoppingCartId = assertNotEmptyString(
        request.params.shoppingCartId
      );

      return handle(shoppingCartId, {
        type: "ConfirmShoppingCart",
        data: {
          shoppingCartId: assertNotEmptyString(
            request.params.shoppingCartId,
            "shoppingCartId"
          ),
        },
      });
    })
  );

  // Confirm Shopping Cart
  router.delete(
    `${prefix}/clients/:clientId/shopping-carts/:shoppingCartId`,
    onCommand((request, handle) => {
      const shoppingCartId = assertNotEmptyString(
        request.params.shoppingCartId
      );

      return handle(shoppingCartId, {
        type: "CancelShoppingCart",
        data: {
          shoppingCartId: assertNotEmptyString(
            request.params.shoppingCartId,
            "shoppingCartId"
          ),
        },
      });
    })
  );
};
