import { container } from "tsyringe";

import { UserTokenRepositoryPrisma } from "../infra/prisma/repositories/UserTokenRepositoryPrisma";
import { type IUserTokenRepository } from "../repositories/IUserTokenRepository";

container.registerSingleton<IUserTokenRepository>(
    "UserTokenRepository",
    UserTokenRepositoryPrisma
);
