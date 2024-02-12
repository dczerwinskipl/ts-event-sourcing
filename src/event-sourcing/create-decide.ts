import { Command, Event } from "@app/core";
import { Decide, DecidersMap } from "./types";

export const UNKNOWN_COMMAND_TYPE = "UNKNOWN_COMMAND_TYPE";

function isKnownCommandType<S, C extends Command, E extends Event>(
  command: C,
  decidersMap: DecidersMap<S, C, E>
): command is C & { type: keyof DecidersMap<S, C, E> } {
  return command.type in decidersMap;
}

export const createDecide =
  <S, C extends Command, E extends Event>(
    decidersMap: DecidersMap<S, C, E>
  ): Decide<S, C, E> =>
  (state, command) => {
    if (!isKnownCommandType(command, decidersMap)) {
      throw new Error(UNKNOWN_COMMAND_TYPE);
    }

    const handler = decidersMap[command.type];
    return handler(state, command as any);
  };
