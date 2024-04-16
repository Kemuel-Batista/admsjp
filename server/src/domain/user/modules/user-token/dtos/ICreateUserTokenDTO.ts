import { type UserToken } from "@prisma/client";

interface ICreateUserTokenDTO {
    token: UserToken["token"];
    refreshToken: UserToken["refreshToken"];
    expiresAt: UserToken["expiresAt"];
    userId: UserToken["userId"];
}

export type { ICreateUserTokenDTO };
