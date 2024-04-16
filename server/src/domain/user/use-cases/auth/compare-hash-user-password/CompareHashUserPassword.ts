import { inject, injectable } from "tsyringe";

import { IHashProvider } from "@modules/user/providers/hash-provider/models/IHashProvider";
import HttpStatusCode from "@shared/enums/HttpStatusCode";
import { AuthError } from "@shared/errors/AuthError";

interface ICompareHashUserPasswordOptions {
    throwIfPasswordNotMatch?: boolean;
    errorKeyPasswordNotMatch?: string;
    errorCodePasswordNotMatch?: HttpStatusCode;
}

@injectable()
class CompareHashUserPassword {
    constructor(
        @inject("HashProvider")
        private readonly hashProvider: IHashProvider
    ) {}

    async execute(
        password: string,
        hashedPassword: string,
        {
            throwIfPasswordNotMatch = true,
            errorKeyPasswordNotMatch = "user.auth.invalidCredentials",
            errorCodePasswordNotMatch = HttpStatusCode.UNAUTHORIZED,
        }: ICompareHashUserPasswordOptions = {}
    ): Promise<boolean> {
        const compareHashPassword = await this.hashProvider.compareHash(
            password,
            hashedPassword
        );

        if (throwIfPasswordNotMatch && !compareHashPassword) {
            throw new AuthError(
                errorKeyPasswordNotMatch,
                errorCodePasswordNotMatch
            );
        }

        return compareHashPassword;
    }
}

export { CompareHashUserPassword };
