import { Event } from "@app/core";
import { MessagePublisher } from "@app/core/message-publisher";
import {
  AggregateEventHandler,
  createAggregateEventHandler,
} from "@app/event-sourcing";
import { assertInitialized } from "./asserts";
import {
  ProductItem,
  ShoppingCartEvent,
  ShoppingCartState,
} from "./shopping-cart";

export type ShoppingCartConfirmed = Event<
  "ShoppingCartConfirmed",
  {
    shoppingCartId: string;
    clientId: string;
    productItems: ProductItem[];
  }
>;

export type ShoppingCartCreated = Event<
  "ShoppingCartCreated",
  {
    shoppingCartId: string;
    clientId: string;
  }
>;

export type ShoppingCartIntegrationEvent =
  | ShoppingCartConfirmed
  | ShoppingCartCreated;

export const createIntegrationEventsProducer = (
  messageBus: MessagePublisher<ShoppingCartIntegrationEvent>
): AggregateEventHandler<ShoppingCartState, ShoppingCartEvent> =>
  createAggregateEventHandler({
    ShoppingCartOpened: async (state, event, context) => {
      assertInitialized(state);

      return await messageBus.publish(
        {
          type: "ShoppingCartCreated",
          data: {
            shoppingCartId: event.data.shoppingCartId,
            clientId: state.clientId,
          },
        },
        context
      );
    },
    ShoppingCartConfirmed: async (state, event, context) => {
      assertInitialized(state);

      return await messageBus.publish(
        {
          type: "ShoppingCartConfirmed",
          data: {
            shoppingCartId: event.data.shoppingCartId,
            clientId: state.clientId,
            productItems: state.productItems.map((p) => ({ ...p })),
          },
        },
        context
      );
    },
  });
