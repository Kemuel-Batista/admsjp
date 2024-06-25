import { ConfigService } from '@nestjs/config';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { Env } from '../env/env';
export type UserGooglePayload = {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    accessToken: string;
};
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor(config: ConfigService<Env, true>);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void>;
}
export {};
