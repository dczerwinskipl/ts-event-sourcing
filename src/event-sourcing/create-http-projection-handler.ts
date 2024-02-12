import { Aggregate } from "@app/core";
import { NextFunction, Request, Response } from "express";

export const createHttpProjectionHandler =
  <S extends Aggregate, R extends Request = Request>(
    getProjection: (recordId: string) => Promise<S | null>
  ) =>
  (
    mapRequest: (
      request: R,
      handler: (recordId: string) => Promise<void>
    ) => Promise<void>
  ) =>
  (request: R, response: Response, next: NextFunction) => {
    mapRequest(request, async (recordId) => {
      const result = await getProjection(recordId);
      return mapToResponse(response, result);
    }).catch(next);
  };

const mapToResponse = <S extends Aggregate>(
  response: Response,
  result: S | null
): void => {
  if (!result) {
    sendNotFound(response);
    return;
  }

  sendOk(response, result);
  return;
};

const sendNotFound = (response: Response): void => {
  response.sendStatus(404);
};

const sendOk = <S extends Aggregate>(response: Response, result: S) => {
  response.status(200).json(result);
};
