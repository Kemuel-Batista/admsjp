"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceAlreadyExistsError = void 0;
const i18n_1 = require("../../i18n/i18n");
class ResourceAlreadyExistsError extends Error {
    constructor({ errorKey, key }) {
        super(`${i18n_1.i18n.t(errorKey, { key })}`);
    }
}
exports.ResourceAlreadyExistsError = ResourceAlreadyExistsError;
//# sourceMappingURL=resource-already-exists-error.js.map