import { type ICreateUserTokenDTO } from "@modules/user/modules/user-token/dtos/ICreateUserTokenDTO";
import { type IUserTokenRepository } from "@modules/user/modules/user-token/repositories/IUserTokenRepository";
import { type UserToken } from "@prisma/client";

class UserTokenRepositoryInMemory implements IUserTokenRepository {
    private readonly userTokens: UserToken[] = [];

    async create({
        token,
        refreshToken,
        expiresAt,
        userId,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        throw new Error("Method not implemented.");
    }

    async findByUserId(userId: UserToken["userId"]): Promise<UserToken> {
        throw new Error("Method not implemented.");
    }

    async findByUserIdAndRefreshToken(
        userId: UserToken["userId"],
        refreshToken: UserToken["refreshToken"]
    ): Promise<UserToken> {
        throw new Error("Method not implemented.");
    }

    async delete(userTokenId: UserToken["id"]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async deleteByUserId(userId: UserToken["userId"]): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export { UserTokenRepositoryInMemory };
