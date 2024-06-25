import { ConfigService } from '@nestjs/config';
import { Env } from './env';
export declare class EnvService {
    private configService;
    constructor(configService: ConfigService<Env, true>);
    get<T extends keyof Env>(key: T): import("@nestjs/config").PathValue<{
        NODE_ENV?: string;
        APP_BASE_URL?: string;
        API_BASE_URL?: string;
        PORT?: number;
        DATABASE_URL?: string;
        JWT_PRIVATE_KEY?: string;
        JWT_PUBLIC_KEY?: string;
        SENDGRID_EMAIL_ADDRESS?: string;
        SENDGRID_API_KEY?: string;
        ADMIN_USERNAME?: string;
        ADMIN_NAME?: string;
        ADMIN_EMAIL?: string;
        ADMIN_PASSWORD?: string;
        CLOUDFLARE_ACCOUNT_ID?: string;
        AWS_BUCKET_NAME?: string;
        AWS_ACCESS_KEY_ID?: string;
        AWS_SECRET_ACCESS_KEY?: string;
        SOCKETIO_SERVER_PORT?: number;
        SOCKETIO_SERVER_PATH?: string;
        GOOGLE_CLIENT_ID?: string;
        GOOGLE_CLIENT_SECRET?: string;
    }, T>;
}
