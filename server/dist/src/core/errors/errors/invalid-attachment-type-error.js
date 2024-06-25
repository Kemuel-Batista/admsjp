"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidAttachmentTypeError = void 0;
const i18n_1 = require("../../i18n/i18n");
class InvalidAttachmentTypeError extends Error {
    constructor({ errorKey, key }) {
        super(`${i18n_1.i18n.t(errorKey, { key })}.`);
    }
}
exports.InvalidAttachmentTypeError = InvalidAttachmentTypeError;
//# sourceMappingURL=invalid-attachment-type-error.js.map