"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const http_status_code_1 = require("../enums/http-status-code");
class AppError extends Error {
    statusCode;
    constructor(message, statusCode = http_status_code_1.default.BAD_REQUEST) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
        this.statusCode = statusCode;
    }
    getResponse(response) {
        return response.status(this.statusCode).json({
            message: this.message,
        });
    }
}
exports.AppError = AppError;
//# sourceMappingURL=AppError.js.map