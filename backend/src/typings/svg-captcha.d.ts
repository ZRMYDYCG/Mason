declare module 'svg-captcha' {
  interface CaptchaOptions {
    size?: number
    ignoreChars?: string
    noise?: number
    color?: boolean
    background?: string
    width?: number
    height?: number
    mathMin?: number
    mathMax?: number
    mathOperator?: string
  }

  export function create(options?: CaptchaOptions): { text: string; data: string }
  export function createMathExpr(options?: CaptchaOptions): { text: string; data: string }
}
