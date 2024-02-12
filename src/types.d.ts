// types.d.ts

declare namespace Express {
  export interface Request {
    correlationId?: string;
  }
}
