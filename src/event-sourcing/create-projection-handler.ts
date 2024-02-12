import { Aggregate, Event } from "@app/core";
import {
  EventSourcedAggregate,
  EventSourcedRepository,
} from "./event-sourced-aggregate";

export const createProjectionHandler =
  <S extends Aggregate, E extends Event, A extends EventSourcedAggregate<S, E>>(
    repository: EventSourcedRepository<S, E, A>
  ) =>
  async (recordId: string): Promise<S | null> =>
    await repository.findState(recordId);
