import Router from 'koa-router'

import authRouter from '../modules/auth/auth.router'
import userRouter from '../modules/user/user.router'
import roleRouter from '../modules/role/role.router'
import menuRouter from '../modules/menu/menu.router'
import uploadRouter from '../modules/upload/upload.router'
import departmentRouter from '../modules/department/department.router'
import captchaRouter from '../modules/captcha/captcha.router'
import logRouter from '../modules/log/log.router'

export const router = new Router()

router.use(authRouter.routes())
router.use(userRouter.routes())
router.use(roleRouter.routes())
router.use(menuRouter.routes())
router.use(uploadRouter.routes())
router.use(departmentRouter.routes())
router.use(captchaRouter.routes())
router.use(logRouter.routes())
