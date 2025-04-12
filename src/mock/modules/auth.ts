import Mock from 'mockjs'

export default [
  /**
   * 用户登录
   * */
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
  },
  /**
   * 获取动态路由列表
   * */
  {
    url: '/routes',
    type: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        data: [
          {
            children: [],
            component: '/kafka-cluster/index'
          },
          {
            children: [],
            component: '/kafka-consumer/index'
          },
          {
            children: [],
            component: '/kafka-host-load/index'
          },
          {
            children: [],
            component: '/kafka-overview/index'
          },
          {
            children: [],
            component: '/kafka-topic/index'
          },
          {
            children: [],
            component: '/kafka-topic-load/index'
          }
        ],
        msg: '获取菜单列表成功'
      })
    }
  }
]
