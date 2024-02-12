export const assertNotUndefined = <T>(item: T | undefined): T => {
  if (item === undefined) {
    throw "undefined";
  }
  return item;
};
