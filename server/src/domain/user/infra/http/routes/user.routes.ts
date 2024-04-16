import { Router } from "express";

import { UserProfile } from "@modules/user/enums/UserProfile";
import { userPermissionRouter } from "@modules/user/modules/infra/http/routes/userPermission.routes";
import { CreateUserController } from "@modules/user/services/create/default/CreateUserController";
import { DeleteUserByIdController } from "@modules/user/services/delete/by-id/DeleteUserByIdController";
import { FindUserByIdController } from "@modules/user/services/find/by-id/FindUserByIdController";
import { ListUserController } from "@modules/user/services/list-user/default/ListUserController";
import { UpdateUserController } from "@modules/user/services/update/default/UpdateUserController";
import { UpdateUserPasswordController } from "@modules/user/services/update/password/UpdateUserPasswordController";
import { UserUpdateSelfPasswordController } from "@modules/user/services/update/self-password/UserUpdateSelfPasswordController";
import { UpdateStatusUserController } from "@modules/user/services/update/status/UpdateStatusUserController";

import { checkUserProfile } from "../middleware/checkuserProfile";

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const deleteUserByIdController = new DeleteUserByIdController();
const findUserByIdController = new FindUserByIdController();
const updateUserController = new UpdateUserController();
const updateStatusUserController = new UpdateStatusUserController();
const userUpdateSelfPasswordController = new UserUpdateSelfPasswordController();
const updateUserPasswordController = new UpdateUserPasswordController();

const userRouter = Router();

userRouter.use("/user-permission/", userPermissionRouter);

userRouter.get("/", listUserController.handle);
userRouter.get("/:userId", findUserByIdController.handle);
userRouter.post(
    "/",
    checkUserProfile([UserProfile.SUPERVISOR, UserProfile.ADMINISTRADOR]),
    createUserController.handle
);
userRouter.put(
    "/",
    checkUserProfile([UserProfile.SUPERVISOR, UserProfile.ADMINISTRADOR]),
    updateUserController.handle
);
userRouter.put("/self-password", userUpdateSelfPasswordController.handle);
userRouter.put(
    "/password",
    checkUserProfile([UserProfile.SUPERVISOR, UserProfile.ADMINISTRADOR]),
    updateUserPasswordController.handle
);
userRouter.patch(
    "/:userId/status/:status",
    checkUserProfile([UserProfile.SUPERVISOR, UserProfile.ADMINISTRADOR]),
    updateStatusUserController.handle
);
userRouter.delete(
    "/:userId",
    checkUserProfile([UserProfile.SUPERVISOR, UserProfile.ADMINISTRADOR]),
    deleteUserByIdController.handle
);

export { userRouter };
