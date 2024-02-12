"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotUndefined = void 0;
const assertNotUndefined = (item) => {
    if (item === undefined) {
        throw "undefined";
    }
    return item;
};
exports.assertNotUndefined = assertNotUndefined;
