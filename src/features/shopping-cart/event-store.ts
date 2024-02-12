import {
  createEventSourcedRepository,
  createEventStore,
} from "@app/event-sourcing";
import { EventStoreDBClient } from "@eventstore/db-client";
import { decider } from "./decider";
import { ShoppingCartEvent } from "./shopping-cart";

const streamName = "shopping_cart";

const createShoppingCartEventStore = (client: EventStoreDBClient) =>
  createEventStore<ShoppingCartEvent>(client, streamName);

export const createShoppingCartRepository = (client: EventStoreDBClient) =>
  createEventSourcedRepository(decider, createShoppingCartEventStore(client));
