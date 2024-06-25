import { UserWithoutPassword } from './user-without-password';
export type UserWithPermission = UserWithoutPassword & {
    permissions: string[];
};
