import Mock from 'mockjs'

export default [
  {
    url: '/login',
    type: 'post',
    response: (options: any) => {
      const body = JSON.parse(options.body)
      const { username, password } = body
      if (username === 'Mason' && password === '123456') {
        return Mock.mock({
          code: 200,
          data: {
            expires: 17722518421,
            id: 13,
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMyIsImlhdCI6MTYyMzI1MTg0MjEsInVzZXJuYW1lIjoiTWFzb24iLCJleHAiOjE2MjMyNTE4NDIxLCJpYXQiOjE2MjMyNTE4NDIxLCJzdWIiOiIxMyJ9.f123456789012345678901',
            username: 'Mason'
          },
          msg: '登录成功'
        })
      } else {
        return {
          code: 400,
          data: null,
          msg: '用户名或密码错误'
        }
      }
    }
  }
]
