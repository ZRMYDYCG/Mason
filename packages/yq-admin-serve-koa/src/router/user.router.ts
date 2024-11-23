/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
 */
import Router from 'koa-router'

import userController from '../controller/user.controller'

import { verifyAuth } from '../middleware/auth.middleware'

import { handlePassword, verifyUser } from '../middleware/user.middleware'

const userRouter = new Router({ prefix: '/user' })

userRouter.get('/:userId', verifyAuth, userController.userInfo)

userRouter.post('/list', verifyAuth, userController.userList)

userRouter.post(
  '/add',
  verifyAuth,
  verifyUser,
  handlePassword,
  userController.addUser
)

userRouter.post('/update', verifyAuth, userController.updateUser)

userRouter.post('/delete', verifyAuth, userController.deleteUser)

export default userRouter
