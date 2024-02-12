"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotEmptyString = void 0;
const assertNotEmptyString = (value, propertyName) => {
    if (typeof value !== "string" || value.trim() === "")
        throw `Assert empty: ${propertyName}`;
    return value;
};
exports.assertNotEmptyString = assertNotEmptyString;
