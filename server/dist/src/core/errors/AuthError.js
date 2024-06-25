"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const http_status_code_1 = require("../enums/http-status-code");
const i18n_1 = require("../i18n/i18n");
class AuthError extends Error {
    statusCode;
    errorKey;
    constructor(errorKey, statusCode = http_status_code_1.default.UNAUTHORIZED) {
        const message = i18n_1.i18n.t(errorKey);
        super(message);
        Object.setPrototypeOf(this, AuthError.prototype);
        this.statusCode = statusCode;
        this.errorKey = errorKey;
    }
    getResponse(response) {
        return response.status(this.statusCode).json({
            code: this.errorKey,
            message: this.message,
        });
    }
}
exports.AuthError = AuthError;
//# sourceMappingURL=AuthError.js.map