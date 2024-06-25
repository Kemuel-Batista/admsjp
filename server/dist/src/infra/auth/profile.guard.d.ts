import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
export declare class ProfileGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    matchProfiles(profiles: Array<User['profileId']>, userProfile: number): boolean;
    canActivate(context: ExecutionContext): boolean;
}
