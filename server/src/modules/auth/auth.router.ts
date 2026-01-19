import Router from 'koa-router'

import authController from './auth.controller'

import { verifyAuth, verifyLogin, verifyRegister } from '../../middleware/auth.middleware'

const authRouter = new Router()

// 用户注册
authRouter.post('/register', verifyRegister, authController.register)

// 用户登录
authRouter.post('/login', verifyLogin, authController.login)

// 授权测试
authRouter.get('/test', verifyAuth, authController.success)

// 用户退出
authRouter.post('/logout', authController.logout)

export default authRouter
