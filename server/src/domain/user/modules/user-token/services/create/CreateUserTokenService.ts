import { inject, injectable } from "tsyringe";

import { type UserToken } from "@prisma/client";

import { type ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { IUserTokenRepository } from "../../repositories/IUserTokenRepository";
import { DeleteUserTokenByUserIdService } from "../delete/by-user-id/DeleteUserTokenByUserIdService";

@injectable()
class CreateUserTokenService {
    private readonly deleteUserTokenByUserIdService: DeleteUserTokenByUserIdService;

    constructor(
        @inject("UserTokenRepository")
        private readonly userTokenRepository: IUserTokenRepository
    ) {
        this.deleteUserTokenByUserIdService =
            new DeleteUserTokenByUserIdService(this.userTokenRepository);
    }

    async execute({
        token,
        refreshToken,
        expiresAt,
        userId,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        await this.deleteUserTokenByUserIdService.execute(userId);

        const userToken = await this.userTokenRepository.create({
            token,
            refreshToken,
            expiresAt,
            userId,
        });

        return userToken;
    }
}

export { CreateUserTokenService };
