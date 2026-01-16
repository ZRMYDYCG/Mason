import type { Context } from 'koa'
import captchaService from './captcha.service'

class CaptchaController {
  async getGraphic(ctx: Context) {
    const result = await captchaService.getGraphicCaptcha()
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
    }
  }

  async getArithmetic(ctx: Context) {
    const result = await captchaService.getArithmeticCaptcha()
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
    }
  }

  async getSlider(ctx: Context) {
    const result = await captchaService.getSliderCaptcha()
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
    }
  }

  async getRotate(ctx: Context) {
    const result = await captchaService.getRotateCaptcha()
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
    }
  }

  async getClick(ctx: Context) {
    const result = await captchaService.getClickCaptcha()
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
    }
  }

  async verify(ctx: Context) {
    const { id, answer } = ctx.request.body as { id: string; answer: any }
    if (!id || answer === undefined) {
        ctx.body = {
            code: 400,
            msg: '参数错误',
        }
        return
    }

    const isValid = await captchaService.verify(id, answer)
    if (isValid) {
      ctx.body = {
        code: 200,
        msg: '验证通过',
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '验证失败',
      }
    }
  }
}

export default new CaptchaController()
