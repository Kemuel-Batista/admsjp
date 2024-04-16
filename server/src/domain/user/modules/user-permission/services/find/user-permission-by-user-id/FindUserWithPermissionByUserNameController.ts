import { type Request, type Response } from "express";
import { container } from "tsyringe";

import HttpStatusCode from "@shared/enums/HttpStatusCode";

import { FindUserWithPermissionByUserNameService } from "./FindUserWithPermissionByUserNameService";

class FindUserWithPermissionByUserNameController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { userName } = request.params;

        const findUserWithPermissionByUserNameService = container.resolve(
            FindUserWithPermissionByUserNameService
        );

        const userPermissions =
            await findUserWithPermissionByUserNameService.execute(userName);

        return response.status(HttpStatusCode.OK).json(userPermissions);
    }
}

export { FindUserWithPermissionByUserNameController };
