"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEventTypeError = void 0;
const i18n_1 = require("../../i18n/i18n");
class InvalidEventTypeError extends Error {
    constructor({ errorKey, key }) {
        super(`${i18n_1.i18n.t(errorKey, { key })}.`);
    }
}
exports.InvalidEventTypeError = InvalidEventTypeError;
//# sourceMappingURL=invalid-event-type-error.js.map