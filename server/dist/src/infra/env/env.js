"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.string(),
    APP_BASE_URL: zod_1.z.string().url(),
    API_BASE_URL: zod_1.z.string().url(),
    PORT: zod_1.z.coerce.number().optional().default(3333),
    DATABASE_URL: zod_1.z.string().url(),
    JWT_PRIVATE_KEY: zod_1.z.string(),
    JWT_PUBLIC_KEY: zod_1.z.string(),
    SENDGRID_EMAIL_ADDRESS: zod_1.z.string().email(),
    SENDGRID_API_KEY: zod_1.z.string(),
    ADMIN_USERNAME: zod_1.z.string(),
    ADMIN_NAME: zod_1.z.string(),
    ADMIN_EMAIL: zod_1.z.string().email(),
    ADMIN_PASSWORD: zod_1.z.string(),
    CLOUDFLARE_ACCOUNT_ID: zod_1.z.string(),
    AWS_BUCKET_NAME: zod_1.z.string(),
    AWS_ACCESS_KEY_ID: zod_1.z.string(),
    AWS_SECRET_ACCESS_KEY: zod_1.z.string(),
    SOCKETIO_SERVER_PORT: zod_1.z.coerce.number(),
    SOCKETIO_SERVER_PATH: zod_1.z.string().optional(),
    GOOGLE_CLIENT_ID: zod_1.z.string(),
    GOOGLE_CLIENT_SECRET: zod_1.z.string(),
});
//# sourceMappingURL=env.js.map