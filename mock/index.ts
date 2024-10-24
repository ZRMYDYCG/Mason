/**
 * @description Mock Router
*/
import { mock, Random } from 'mockjs'
import type { IReq } from './interface/index'
import type { MockMethod } from 'vite-plugin-mock'
import { setToken, checkToken, responseData } from './middleware/index'
import { login } from './response/user'

export default [
    {
        url: '/api/user/login',
        method: 'post',
        timeout: 2000,
        response: (req: IReq) => {
            const { username, password } = req.body
            if(login(username, password)) return responseData(200, '登录成功', setToken(username))
            return responseData(401, '用户名或密码错误')
        }
    },
    {
        url: '/api/user/getInfo',
    },
    {
        url: '/api/user/getRoute',
        method: 'get',
        timeout: 2000,
    }
] as MockMethod[]