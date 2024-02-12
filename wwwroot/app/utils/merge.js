"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
const not_undefined_1 = require("./asserts/not-undefined");
const merge = (array, item, where, onExisting, onNotFound = () => undefined) => {
    let wasFound = false;
    const result = array
        .map((p) => {
        if (!where(p))
            return p;
        wasFound = true;
        return onExisting(p);
    })
        .filter((p) => p !== undefined)
        .map(not_undefined_1.assertNotUndefined);
    if (!wasFound) {
        const result = onNotFound();
        if (result !== undefined)
            return [...array, item];
    }
    return result;
};
exports.merge = merge;
