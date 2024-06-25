"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectAssociationError = void 0;
const i18n_1 = require("../../i18n/i18n");
class IncorrectAssociationError extends Error {
    constructor({ errorKey, key }) {
        super(`${i18n_1.i18n.t(errorKey, { key })}.`);
    }
}
exports.IncorrectAssociationError = IncorrectAssociationError;
//# sourceMappingURL=incorrect-association-error.js.map