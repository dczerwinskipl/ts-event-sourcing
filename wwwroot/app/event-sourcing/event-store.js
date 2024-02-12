"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = exports.createEventStore = exports.mapStreamId = void 0;
const db_client_1 = require("@eventstore/db-client");
const mapStreamId = (streamName, id) => `${streamName}-${id}`;
exports.mapStreamId = mapStreamId;
const createEventStore = (client, streamName) => ({
    readStream: async (id) => {
        const readResult = client.readStream((0, exports.mapStreamId)(streamName, id));
        const events = [];
        for await (const { event } of readResult) {
            if (!event)
                continue;
            events.push({ type: event.type, data: event.data });
        }
        return events;
    },
    appendToStream: async (id, events) => {
        return await client.appendToStream((0, exports.mapStreamId)(streamName, id), events.map(db_client_1.jsonEvent));
    },
});
exports.createEventStore = createEventStore;
const getEvents = async (eventStore, recordId) => {
    try {
        return await eventStore.readStream(recordId);
    }
    catch (error) {
        if (error instanceof db_client_1.StreamNotFoundError) {
            return [];
        }
        throw error;
    }
};
exports.getEvents = getEvents;
