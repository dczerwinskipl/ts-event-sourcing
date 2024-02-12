"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShoppingCartRepository = void 0;
const event_sourcing_1 = require("@app/event-sourcing");
const decider_1 = require("./decider");
const streamName = "shopping_cart";
const createShoppingCartEventStore = (client) => (0, event_sourcing_1.createEventStore)(client, streamName);
const createShoppingCartRepository = (client) => (0, event_sourcing_1.createEventSourcedRepository)(decider_1.decider, createShoppingCartEventStore(client));
exports.createShoppingCartRepository = createShoppingCartRepository;
