export type MessageDataType =
  | string
  | Record<string | number, unknown>
  | unknown[];

export type Message<
  M extends string = string,
  D extends MessageDataType = Record<string, unknown>
> = {
  type: M;
  data: D;
};

export type Event<
  E extends string = string,
  D extends MessageDataType = Record<string, unknown>
> = Message<E, D>;

export type Command<
  C extends string = string,
  D extends MessageDataType = Record<string, unknown>
> = Message<C, D>;

export type CommandHandler = <C extends Command>(command: C) => Promise<void>;

export type EventHandler = <E extends Event>(event: E) => Promise<void>;
