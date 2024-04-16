import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenService } from "./RefreshTokenService";

class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const refreshToken =
            request.body.token ||
            request.headers["x-access-token"] ||
            request.query.token;

        const refreshTokenService = container.resolve(RefreshTokenService);

        const token = await refreshTokenService.execute(refreshToken);

        return response.status(200).json(token);
    }
}

export { RefreshTokenController };
