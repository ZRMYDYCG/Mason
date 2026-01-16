import Router from 'koa-router'
import captchaController from './captcha.controller'

const router = new Router({ prefix: '/captcha' })

router.get('/graphic', captchaController.getGraphic)
router.get('/arithmetic', captchaController.getArithmetic)
router.get('/slider', captchaController.getSlider)
router.get('/rotate', captchaController.getRotate)
router.get('/click', captchaController.getClick)
router.post('/verify', captchaController.verify)

export default router
