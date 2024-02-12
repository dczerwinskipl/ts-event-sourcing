import { EventStoreDBClient } from "@eventstore/db-client";
import { registerRoutes as registerShoppingCartRoutes } from "@features/shopping-cart";
import express from "express";
import { Kafka } from "kafkajs";
import { correlationIdMiddleware } from "./infraastructure/correlation-id-middleware";

const app = express();
const port = 3000;

app.use(express.json());
app.use(correlationIdMiddleware);

registerShoppingCartRoutes(
  app,
  "/api",
  () =>
    new EventStoreDBClient(
      { endpoint: "localhost:2113" },
      {
        insecure: true,
      }
    ),
  () =>
    new Kafka({
      brokers: ["localhost:9092"],
      clientId: "event-sourcing-test",
    })
);

app.listen(port, () => {});
