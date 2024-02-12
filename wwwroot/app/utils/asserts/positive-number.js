"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertPositiveNumber = void 0;
const not_empty_number_1 = require("./not-empty-number");
const assertPositiveNumber = (value, propertyName) => {
    const numberValue = (0, not_empty_number_1.assertNotEmptyNumber)(value, propertyName);
    if (numberValue < 1) {
        throw `Not positive: ${propertyName}`;
    }
    return numberValue;
};
exports.assertPositiveNumber = assertPositiveNumber;
