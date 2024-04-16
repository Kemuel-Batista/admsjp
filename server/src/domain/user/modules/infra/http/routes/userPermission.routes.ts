import { Router } from "express";

import { FindUserWithPermissionByUserNameController } from "@modules/user/modules/user-permission/services/find/user-permission-by-user-id/FindUserWithPermissionByUserNameController";

const findUserWithPermissionByUserNameController =
    new FindUserWithPermissionByUserNameController();

const userPermissionRouter = Router();

userPermissionRouter.get(
    "/:userName",
    findUserWithPermissionByUserNameController.handle
);

export { userPermissionRouter };
