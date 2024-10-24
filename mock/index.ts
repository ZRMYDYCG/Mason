/**
 * @description Mock Router
 */
import { mock, Random } from 'mockjs'
import type { IReq } from './interface/index'
import type { MockMethod } from 'vite-plugin-mock'
import { setToken, checkToken, responseData } from './middleware/index'
import { login, getUser } from './response/user'

export default [
  {
    url: '/api/user/login',
    method: 'post',
    timeout: 2000,
    response: (req: IReq) => {
      const { username, password } = req.body
      if (login(username, password))
        return responseData(200, '登录成功', setToken(username))
      return responseData(401, '用户名或密码错误')
    },
  },
  {
    url: '/api/user/getUser',
    method: 'get',
    timeout: 2000,
    response: (req: IReq) => {
      const username = checkToken(req)
      if (!username) return responseData(401, '身份认证失败')
      return responseData(200, '', getUser(username))
    },
  },
  {
    url: '/api/user/getRoute',
    method: 'get',
    timeout: 2000,
  },
] as MockMethod[]
