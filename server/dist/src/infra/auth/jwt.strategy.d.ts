import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { z } from 'zod';
import { Env } from '../env/env';
declare const tokenPayloadSchema: z.ZodObject<{
    sub: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        status: z.ZodNumber;
        profileId: z.ZodNumber;
        departmentId: z.ZodNumber;
        email: z.ZodString;
        permissions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        id?: number;
        name?: string;
        status?: number;
        profileId?: number;
        departmentId?: number;
        email?: string;
        permissions?: string[];
    }, {
        id?: number;
        name?: string;
        status?: number;
        profileId?: number;
        departmentId?: number;
        email?: string;
        permissions?: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    sub?: {
        id?: number;
        name?: string;
        status?: number;
        profileId?: number;
        departmentId?: number;
        email?: string;
        permissions?: string[];
    };
}, {
    sub?: {
        id?: number;
        name?: string;
        status?: number;
        profileId?: number;
        departmentId?: number;
        email?: string;
        permissions?: string[];
    };
}>;
export type UserPayload = z.infer<typeof tokenPayloadSchema>;
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: ConfigService<Env, true>);
    private static extractJWT;
    validate(payload: UserPayload): Promise<{
        sub?: {
            id?: number;
            name?: string;
            status?: number;
            profileId?: number;
            departmentId?: number;
            email?: string;
            permissions?: string[];
        };
    }>;
}
export {};
