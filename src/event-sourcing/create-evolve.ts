import { Event } from "@app/core";
import { Evolve, EvolversMap } from "./types";

export const UNKNOWN_EVENT_TYPE = "UNKNOWN_EVENT_TYPE";

function isKnownEventType<S, E extends Event>(
  event: E,
  decidersMap: EvolversMap<S, E>
): event is E & { type: keyof EvolversMap<S, E> } {
  return event.type in decidersMap;
}

export const createEvolve =
  <S, E extends Event>(decidersMap: EvolversMap<S, E>): Evolve<S, E> =>
  (state, event) => {
    if (!isKnownEventType(event, decidersMap)) {
      throw new Error(UNKNOWN_EVENT_TYPE);
    }

    const handler = decidersMap[event.type];
    return handler(state, event as any);
  };
