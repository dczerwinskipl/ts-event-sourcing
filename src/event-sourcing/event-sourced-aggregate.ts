import { Aggregate, Event, Repository } from "@app/core";

export type EventSourcedAggregate<S extends Aggregate, E extends Event> = S & {
  events: E[];
  uncommitedEvents: E[];
  appendEvents: (events: E[]) => void;
  flushEvents: () => E[];
};

export type EventSourcedRepository<
  S extends Aggregate,
  E extends Event,
  A extends EventSourcedAggregate<S, E>
> = Repository<A> & {
  findState: (recordId: string) => Promise<S | null>;
};
