/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
 */
declare global {
  interface IResponse<T = any> {
    Code: number
    Msg: string
    Data: T
  }
  interface IObject<T> {
    [index: string]: T
  }
}
