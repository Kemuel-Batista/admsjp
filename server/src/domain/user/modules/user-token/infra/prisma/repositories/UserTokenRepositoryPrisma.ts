import { type ICreateUserTokenDTO } from "@modules/user/modules/user-token/dtos/ICreateUserTokenDTO";
import { type IUserTokenRepository } from "@modules/user/modules/user-token/repositories/IUserTokenRepository";
import { type UserToken } from "@prisma/client";
import { prisma } from "@shared/infra/prisma";

class UserTokenRepositoryPrisma implements IUserTokenRepository {
    async create({
        token,
        refreshToken,
        expiresAt,
        userId,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const newToken = await prisma.userToken.create({
            data: {
                token,
                refreshToken,
                expiresAt,
                userId,
            },
        });

        return newToken;
    }

    async findByUserId(userId: UserToken["userId"]): Promise<UserToken | null> {
        const token = await prisma.userToken.findFirst({
            where: {
                userId,
            },
        });

        return token;
    }

    async findByUserIdAndRefreshToken(
        userId: UserToken["userId"],
        refreshToken: UserToken["refreshToken"]
    ): Promise<UserToken | null> {
        const token = await prisma.userToken.findFirst({
            where: {
                userId,
                refreshToken,
            },
        });

        return token;
    }

    async delete(userTokenId: UserToken["id"]): Promise<void> {
        await prisma.userToken.delete({
            where: {
                id: userTokenId,
            },
        });
    }

    async deleteByUserId(userId: UserToken["userId"]): Promise<void> {
        await prisma.userToken.deleteMany({
            where: {
                userId,
            },
        });
    }
}

export { UserTokenRepositoryPrisma };
