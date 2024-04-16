import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { authConfig } from "@config/auth";
import { IUserTokenRepository } from "@modules/user/modules/user-token/repositories/IUserTokenRepository";
import { CreateUserTokenService } from "@modules/user/modules/user-token/services/create/CreateUserTokenService";
import { type User, type UserToken } from "@prisma/client";
import { IDateProvider } from "@shared/container/providers/date-provider/models/IDateProvider";

interface IGenerateTokenAndRefreshTokenResponse {
    token: string;
    refreshToken: UserToken["refreshToken"];
}

@injectable()
class GenerateUserTokenService {
    private readonly createUserTokenService: CreateUserTokenService;
    constructor(
        @inject("UserTokenRepository")
        private readonly userTokenRepository: IUserTokenRepository,
        @inject("DateProvider")
        private readonly dateProvider: IDateProvider
    ) {
        this.createUserTokenService = new CreateUserTokenService(
            this.userTokenRepository
        );
    }

    async execute(user: User): Promise<IGenerateTokenAndRefreshTokenResponse> {
        const {
            secretToken,
            secretRefreshToken,
            expiresInToken,
            expiresInRefreshToken,
            expiresInRefreshTokenInDays,
        } = authConfig;

        const token = sign({}, secretToken, {
            subject: user.username,
            expiresIn: expiresInToken,
        });

        const refreshToken = sign({}, secretRefreshToken, {
            subject: user.username,
            expiresIn: expiresInRefreshToken,
        });

        const refreshTokenExpiresAt = this.dateProvider.addDays(
            expiresInRefreshTokenInDays
        );

        await this.createUserTokenService.execute({
            token,
            refreshToken,
            expiresAt: refreshTokenExpiresAt,
            userId: user.id,
        });

        return {
            token,
            refreshToken,
        };
    }
}

export { GenerateUserTokenService };
