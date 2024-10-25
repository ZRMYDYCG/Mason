/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
 */
import request from '../index'

const api = {
  login: '/api/user/login',
  users: '/api/user/info',
}

// 登录
export const login = (params: any) => {
  return request.post(api.login, params)
}

// 获取路由列表
export const getRoute = () => {
  return request.get('/api/user/getRoute')
}
