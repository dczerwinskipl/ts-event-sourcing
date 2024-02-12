import { Command, Event } from "@app/core";
import { AppendResult } from "@eventstore/db-client";

export type Decide<S, C extends Command, E extends Event> = (
  state: S,
  command: C
) => E | E[];

export type DecidersMap<S, C extends Command, E extends Event> = {
  [K in C["type"]]: Decide<S, Extract<C, { type: K }>, E>;
};

export type Evolve<S, E extends Event> = (currentState: S, event: E) => S;

export type EvolversMap<S, E extends Event> = {
  [K in E["type"]]: Evolve<S, Extract<E, { type: K }>>;
};

export type Decider<S, C extends Command, E extends Event> = {
  decide: Decide<S, C, E>;
  evolve: Evolve<S, E>;
  getInitialState: () => S;
};

export type EventStore<E extends Event> = {
  readStream: (id: string) => Promise<E[]>;
  appendToStream: (id: string, events: E[]) => Promise<AppendResult>; // TODO; remove?
};
