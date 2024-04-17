userRouter.get('/', listUserController.handle)
userRouter.get('/:userId', findUserByIdController.handle)
userRouter.post(
  '/',
  checkUserProfile([UserProfile.SUPERVISOR, UserProfile.ADMINISTRADOR]),
  createUserController.handle,
)
userRouter.put(
  '/',
  checkUserProfile([UserProfile.SUPERVISOR, UserProfile.ADMINISTRADOR]),
  updateUserController.handle,
)
userRouter.put('/self-password', userUpdateSelfPasswordController.handle)
userRouter.put(
  '/password',
  checkUserProfile([UserProfile.SUPERVISOR, UserProfile.ADMINISTRADOR]),
  updateUserPasswordController.handle,
)
userRouter.patch(
  '/:userId/status/:status',
  checkUserProfile([UserProfile.SUPERVISOR, UserProfile.ADMINISTRADOR]),
  updateStatusUserController.handle,
)
userRouter.delete(
  '/:userId',
  checkUserProfile([UserProfile.SUPERVISOR, UserProfile.ADMINISTRADOR]),
  deleteUserByIdController.handle,
)

export { userRouter }
