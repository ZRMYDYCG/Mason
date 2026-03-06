export class Env {
  /**
   * 获取环境变量
   * @param key 环境变量名
   * @param defaultValue 默认值
   */
  static get<T>(key: keyof ImportMetaEnv, defaultValue?: T): T | string {
    const value = import.meta.env[key]
    return value ?? (defaultValue as T)
  }

  /**
   * 获取数字类型的环境变量
   */
  static getNumber(key: keyof ImportMetaEnv, defaultValue?: number): number {
    const value = import.meta.env[key]
    if (value === undefined) {
      return defaultValue as number
    }
    return Number(value)
  }

  /**
   * 获取布尔类型的环境变量
   */
  static getBoolean(key: keyof ImportMetaEnv, defaultValue?: boolean): boolean {
    const value = import.meta.env[key]
    if (value === undefined) {
      return defaultValue as boolean
    }
    return value === 'true' || value === '1'
  }

  /** 获取当前环境 */
  static get env(): 'dev' | 'uat' | 'prod' {
    return this.get('VITE_ENV', 'dev') as 'dev' | 'uat' | 'prod'
  }

  /** 是否为开发环境 */
  static get isDev(): boolean {
    return this.env === 'dev'
  }

  /** 是否为UAT环境 */
  static get isUat(): boolean {
    return this.env === 'uat'
  }

  /** 是否为生产环境 */
  static get isProd(): boolean {
    return this.env === 'prod'
  }
}
