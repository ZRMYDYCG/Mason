import { Body, Controller, Get, Post } from '@nestjs/common'
import { ZodBodyPipe } from '../common/zod-validation.pipe'
import { CaptchaService } from './captcha.service'
import { VerifyCaptchaBody, verifyCaptchaSchema } from './captcha.schemas'

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
  async verify(@Body(new ZodBodyPipe(verifyCaptchaSchema)) body: VerifyCaptchaBody) {
    const isValid = await this.captchaService.verify(body.id, body.answer)
    return isValid ? { code: 200, msg: '验证通过' } : { code: 400, msg: '验证失败' }
  }
}
