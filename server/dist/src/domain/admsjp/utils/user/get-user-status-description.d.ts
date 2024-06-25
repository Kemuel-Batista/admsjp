import { type User } from '@prisma/client';
export declare function getUserStatusDescription(status: User['status']): string | null;
