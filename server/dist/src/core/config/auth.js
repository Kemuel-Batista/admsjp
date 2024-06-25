"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
require("dotenv/config");
const authConfig = {
    secretToken: process.env.APP_SECRET || 'defaultSecretToken',
    secretRefreshToken: process.env.APP_REFRESH_SECRET || 'defaultSecretRefreshToken',
    expiresInToken: '60m',
    expiresInRefreshToken: '1d',
    expiresInRefreshTokenInDays: 1,
};
exports.authConfig = authConfig;
//# sourceMappingURL=auth.js.map