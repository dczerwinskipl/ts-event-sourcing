import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";

// Middleware to attach or generate a correlation ID
export const correlationIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let correlationId = req.headers["x-correlation-id"];

  // Ensure correlationId is a string
  if (Array.isArray(correlationId)) {
    correlationId = correlationId[0];
  }

  if (!correlationId) {
    correlationId = v4();
  }

  req.correlationId = correlationId;
  res.setHeader("X-Correlation-ID", correlationId);
  next();
};
