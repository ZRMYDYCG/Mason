import Router from 'koa-router'
import userController from './user.controller'
import { verifyAuth } from '../../middleware/auth.middleware'
import { handlePassword, verifyUser } from '../../middleware/user.middleware'

import upload from '../../middleware/upload.middleware'

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/list', verifyAuth, userController.userList)

userRouter.post('/add', verifyAuth, verifyUser, handlePassword, userController.addUser)

userRouter.post(
  '/update-profile',
  verifyAuth,
  upload.single('avatar'),
  userController.updateProfile
)

userRouter.post('/update', verifyAuth, userController.updateUser)
userRouter.post('/delete', verifyAuth, userController.deleteUser)

userRouter.get('/:userId', verifyAuth, userController.userInfo)

export default userRouter
