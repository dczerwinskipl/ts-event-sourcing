import { assertNotEmptyNumber } from "./not-empty-number";

export const assertPositiveNumber = (
  value: unknown,
  propertyName?: string
): number => {
  const numberValue = assertNotEmptyNumber(value, propertyName);

  if (numberValue < 1) {
    throw `Not positive: ${propertyName}`;
  }

  return numberValue;
};
