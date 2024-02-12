import { Context } from "./context";
import { Message } from "./messages";

export interface MessagePublisher<MGroup extends Message> {
  publish<M extends MGroup>(message: M, context: Context): Promise<void>;
}
