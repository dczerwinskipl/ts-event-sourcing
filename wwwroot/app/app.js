"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_client_1 = require("@eventstore/db-client");
const shopping_cart_1 = require("@features/shopping-cart");
const express_1 = __importDefault(require("express"));
const kafkajs_1 = require("kafkajs");
const correlation_id_middleware_1 = require("./infraastructure/correlation-id-middleware");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(correlation_id_middleware_1.correlationIdMiddleware);
(0, shopping_cart_1.registerRoutes)(app, "/api", () => new db_client_1.EventStoreDBClient({ endpoint: "localhost:2113" }, {
    insecure: true,
}), () => new kafkajs_1.Kafka({
    brokers: ["localhost:9092"],
    clientId: "event-sourcing-test",
}));
app.listen(port, () => { });
