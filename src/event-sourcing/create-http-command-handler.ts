import { Command } from "@app/core";
import { Context } from "@app/core/context";
import { NextFunction, Request, Response } from "express";
import { NOT_INITIALIZED } from "./errors";
import { v4 } from "uuid";

export const createHttpCommandHandler =
  <C extends Command, R extends Request = Request>(
    handleCommand: (
      recordId: string,
      command: C,
      context: Context
    ) => Promise<void | NOT_INITIALIZED>
  ) =>
  (
    mapRequest: (
      request: R,
      handler: (recordId: string, command: C) => Promise<void>
    ) => Promise<void>,
    urlPrefix?: string
  ) =>
  (request: R, response: Response, next: NextFunction) => {
    const context: Context = {
      correlationId: request.correlationId ?? v4(),
    };
    mapRequest(request, async (recordId, command) => {
      const result = await handleCommand(recordId, command, context);
      return mapToResponse(response, recordId, result, urlPrefix);
    }).catch(next);
  };

const mapToResponse = (
  response: Response,
  recordId: string,
  result: void | NOT_INITIALIZED,
  urlPrefix?: string
): void => {
  if (result === "NOT_INITIALIZED") {
    sendNotFound(response);
    return;
  }

  sendCreated(response, recordId, urlPrefix);
  return;
};

const sendCreated = (
  response: Response,
  createdId: string,
  urlPrefix?: string
): void => {
  response.setHeader(
    "Location",
    `${urlPrefix ?? response.req.url}/${createdId}`
  );
  response.status(201).json({ id: createdId });
};

const sendNotFound = (response: Response): void => {
  response.sendStatus(404);
};
