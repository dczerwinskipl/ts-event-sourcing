export type NOT_INITIALIZED = "NOT_INITIALIZED";

export class NotInitializedError extends Error {
  type: NOT_INITIALIZED;

  constructor() {
    super(`Not initialized`);
    this.type = "NOT_INITIALIZED";
  }
}
