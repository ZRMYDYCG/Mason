import { Body, Controller, Get, Post } from '@nestjs/common'
import { CaptchaService } from './captcha.service'

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get('graphic')
  async getGraphic() {
    return { code: 200, data: await this.captchaService.getGraphicCaptcha(), msg: '获取成功' }
  }

  @Get('arithmetic')
  async getArithmetic() {
    return { code: 200, data: await this.captchaService.getArithmeticCaptcha(), msg: '获取成功' }
  }

  @Get('slider')
  async getSlider() {
    return { code: 200, data: await this.captchaService.getSliderCaptcha(), msg: '获取成功' }
  }

  @Get('rotate')
  async getRotate() {
    return { code: 200, data: await this.captchaService.getRotateCaptcha(), msg: '获取成功' }
  }

  @Get('click')
  async getClick() {
    return { code: 200, data: await this.captchaService.getClickCaptcha(), msg: '获取成功' }
  }

  @Post('verify')
  async verify(@Body() body: any) {
    if (!body.id || body.answer === undefined) return { code: 400, msg: '参数错误' }
    const isValid = await this.captchaService.verify(body.id, body.answer)
    return isValid ? { code: 200, msg: '验证通过' } : { code: 400, msg: '验证失败' }
  }
}
