export const assertNotEmptyString = (
  value: unknown,
  propertyName?: string
): string => {
  if (typeof value !== "string" || value.trim() === "")
    throw `Assert empty: ${propertyName}`;
  return value;
};
