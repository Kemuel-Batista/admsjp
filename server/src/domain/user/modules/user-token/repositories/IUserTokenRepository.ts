import { type UserToken } from "@prisma/client";

import { type ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";

interface IUserTokenRepository {
    create: (data: ICreateUserTokenDTO) => Promise<UserToken>;
    findByUserId: (userId: UserToken["userId"]) => Promise<UserToken | null>;
    findByUserIdAndRefreshToken: (
        userId: UserToken["userId"],
        refreshToken: UserToken["refreshToken"]
    ) => Promise<UserToken | null>;
    delete: (userTokenId: UserToken["id"]) => Promise<void>;
    deleteByUserId: (userId: UserToken["userId"]) => Promise<void>;
}

export type { IUserTokenRepository };
