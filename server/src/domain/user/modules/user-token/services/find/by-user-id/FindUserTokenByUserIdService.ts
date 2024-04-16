import { inject, injectable } from "tsyringe";

import { type UserToken } from "@prisma/client";
import HttpStatusCode from "@shared/enums/HttpStatusCode";
import { AppError } from "@shared/errors/AppError";
import { i18n } from "@shared/i18n/i18n";
import { type IFindOptions } from "@shared/interfaces/IFindOptions";

import { IUserTokenRepository } from "../../../repositories/IUserTokenRepository";

type TFindUserTokenByUserIdService<Options extends IFindOptions> =
    | UserToken
    | (Options["throwIfNotFound"] extends true ? never : null);
@injectable()
class FindUserTokenByUserIdService {
    constructor(
        @inject("UserTokenRepository")
        private readonly userTokenRepository: IUserTokenRepository
    ) {}

    async execute<Options extends IFindOptions>(
        userId: UserToken["userId"],
        options: Partial<Options> = {}
    ): Promise<TFindUserTokenByUserIdService<Options>> {
        const {
            throwIfFound = false,
            throwIfNotFound = false,
            errorKeyFound = "user.token.create.alreadyExists",
            errorKeyNotFound = "user.token.find.notFound",
            errorCodeFound = HttpStatusCode.BAD_REQUEST,
            errorCodeNotFound = HttpStatusCode.NOT_FOUND,
        } = options;

        let userToken: UserToken | null = null;

        if (userId !== null) {
            userToken = await this.userTokenRepository.findByUserId(userId);
        }

        if (throwIfFound && userToken) {
            throw new AppError(
                i18n.t(errorKeyFound, { userId }),
                errorCodeFound
            );
        }

        if (throwIfNotFound && !userToken) {
            throw new AppError(
                i18n.t(errorKeyNotFound, { userId }),

                errorCodeNotFound
            );
        }

        return userToken as TFindUserTokenByUserIdService<Options>;
    }
}

export { FindUserTokenByUserIdService };
