export const assertNotEmptyNumber = (
  value: unknown,
  propertyName?: string
): number => {
  if (value === undefined || value === null) {
    throw `Assert empty: ${propertyName}`;
  }

  if (typeof value !== "number" && typeof value !== "string") {
    throw `Value is not a number or string: ${propertyName}`;
  }

  const numberValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numberValue)) {
    throw `Is not a number: ${propertyName}`;
  }

  return numberValue;
};
