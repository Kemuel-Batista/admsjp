import { inject, injectable } from "tsyringe";

import { type UserToken } from "@prisma/client";

import { IUserTokenRepository } from "../../../repositories/IUserTokenRepository";

@injectable()
class DeleteUserTokenByUserIdService {
    constructor(
        @inject("UserTokenRepository")
        private readonly userTokenRepository: IUserTokenRepository
    ) {}

    async execute(userId: UserToken["userId"]): Promise<void> {
        await this.userTokenRepository.deleteByUserId(userId);
    }
}

export { DeleteUserTokenByUserIdService };
