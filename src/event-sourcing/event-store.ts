import { Event } from "@app/core";
import {
  EventStoreDBClient,
  StreamNotFoundError,
  jsonEvent,
} from "@eventstore/db-client";
import { EventStore } from "./types";

export const mapStreamId = (streamName: string, id: string) =>
  `${streamName}-${id}`;

export const createEventStore = <E extends Event>(
  client: EventStoreDBClient,
  streamName: string
): EventStore<E> => ({
  readStream: async (id: string) => {
    const readResult = client.readStream<E>(mapStreamId(streamName, id));

    const events: E[] = [];

    for await (const { event } of readResult) {
      if (!event) continue;
      events.push(<E>{ type: event.type, data: event.data });
    }

    return events;
  },
  appendToStream: async (id: string, events: E[]) => {
    return await client.appendToStream(
      mapStreamId(streamName, id),
      events.map(jsonEvent)
    );
  },
});

export const getEvents = async <E extends Event>(
  eventStore: EventStore<E>,
  recordId: string
) => {
  try {
    return await eventStore.readStream(recordId);
  } catch (error) {
    if (error instanceof StreamNotFoundError) {
      return [];
    }
    throw error;
  }
};
