import http from '@/api'

export namespace Captcha {
  export interface GraphicRes {
    id: string
    svg: string
  }

  export interface SliderRes {
    id: string
    bgUrl: string
    puzzleUrl: string
    y: number
  }

  export interface RotateRes {
    id: string
    imgUrl: string
  }

  export interface ClickRes {
    id: string
    imgUrl: string
    prompt: string
  }

  export interface VerifyReq {
    id: string
    answer: any
  }
}

// 获取图形验证码
export const getGraphicCaptcha = () => {
  return http.get<Captcha.GraphicRes>('/captcha/graphic')
}

// 获取运算验证码
export const getArithmeticCaptcha = () => {
  return http.get<Captcha.GraphicRes>('/captcha/arithmetic')
}

// 获取滑块验证码
export const getSliderCaptcha = () => {
  return http.get<Captcha.SliderRes>('/captcha/slider')
}

// 获取旋转验证码
export const getRotateCaptcha = () => {
  return http.get<Captcha.RotateRes>('/captcha/rotate')
}

// 获取点选验证码
export const getClickCaptcha = () => {
  return http.get<Captcha.ClickRes>('/captcha/click')
}

// 验证
export const verifyCaptcha = (params: Captcha.VerifyReq) => {
  return http.post('/captcha/verify', params)
}
