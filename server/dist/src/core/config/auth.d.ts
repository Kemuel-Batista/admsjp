import 'dotenv/config';
declare const authConfig: {
    secretToken: string;
    secretRefreshToken: string;
    expiresInToken: string;
    expiresInRefreshToken: string;
    expiresInRefreshTokenInDays: number;
};
export { authConfig };
