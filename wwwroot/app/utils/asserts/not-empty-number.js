"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotEmptyNumber = void 0;
const assertNotEmptyNumber = (value, propertyName) => {
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
exports.assertNotEmptyNumber = assertNotEmptyNumber;
