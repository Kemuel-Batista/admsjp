import { Router } from "express";

import { AuthUserController } from "@modules/user/services/auth/default/AuthUserController";
import { RefreshTokenController } from "@modules/user/services/refresh-token/RefreshTokenController";

const authUserController = new AuthUserController();
const refreshTokenController = new RefreshTokenController();

const authRouter = Router();

authRouter.post("/session", authUserController.handle);
authRouter.post("/refresh-token", refreshTokenController.handle);

export { authRouter };
