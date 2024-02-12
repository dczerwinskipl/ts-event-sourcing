import { assertNotUndefined } from "./asserts/not-undefined";

export const merge = <T>(
  array: T[],
  item: T,
  where: (current: T) => boolean,
  onExisting: (current: T) => T | undefined,
  onNotFound: () => T | undefined = () => undefined
) => {
  let wasFound = false;

  const result = array
    .map((p: T) => {
      if (!where(p)) return p;

      wasFound = true;
      return onExisting(p);
    })
    .filter((p) => p !== undefined)
    .map(assertNotUndefined);

  if (!wasFound) {
    const result = onNotFound();

    if (result !== undefined) return [...array, item];
  }

  return result;
};
