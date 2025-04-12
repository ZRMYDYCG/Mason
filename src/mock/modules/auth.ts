import Mock from 'mockjs'

export default [
  /**
   * 用户登录
   * */
  {
    url: '/api/kafka/login',
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
    url: '/api/kafka/menu/list',
    type: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        data: [
          {
            children: [],
            component: '/workbench/index',
            id: 0,
            createAt: '2021-06-15 16:20:00',
            meta: {
              icon: 'dashboard',
              isAffix: true,
              isEnable: true,
              isKeeAlive: false,
              isLink: false,
              title: '工作台'
            },
            name: 'dashboard',
            parentId: 0,
            path: '/dashboard',
            sort: 1
          },
          {
            children: [],
            component: '/kafka-cluster/index',
            id: 1,
            createAt: '2021-06-15 16:20:00',
            meta: {
              icon: '',
              isAffix: false,
              isEnable: true,
              isKeeAlive: false,
              isLink: false,
              title: '集群管理'
            },
            name: 'kafka-cluster',
            parentId: 0,
            path: '/kafka-cluster',
            sort: 1
          },
          {
            children: [],
            component: '/kafka-overview/index',
            id: 2,
            createAt: '2021-06-15 16:20:00',
            meta: {
              icon: '',
              isAffix: false,
              isEnable: true,
              isKeeAlive: false,
              isLink: false,
              title: '集群概览'
            },
            name: 'kafka-overview',
            parentId: 0,
            path: '/kafka-overview',
            sort: 2
          },
          {
            children: [],
            component: '/kafka-topic/index',
            id: 3,
            createAt: '2021-06-15 16:20:00',
            meta: {
              icon: '',
              isAffix: false,
              isEnable: true,
              isKeeAlive: false,
              isLink: false,
              title: 'Topic监控'
            },
            name: 'kafka-topic',
            parentId: 0,
            path: '/kafka-topic',
            sort: 3
          },
          {
            children: [],
            component: '/kafka-consumer/index',
            id: 4,
            createAt: '2021-06-15 16:20:00',
            meta: {
              icon: '',
              isAffix: false,
              isEnable: true,
              isKeeAlive: false,
              isLink: false,
              title: '消费者监控'
            },
            name: 'kafka-consumer',
            parentId: 0,
            path: '/kafka-consumer',
            sort: 4
          },
          {
            children: [],
            component: '/kafka-host-load/index',
            id: 5,
            createAt: '2021-06-15 16:20:00',
            meta: {
              icon: '',
              isAffix: false,
              isEnable: true,
              isKeeAlive: false,
              isLink: false,
              title: '主机负载'
            },
            name: 'kafka-host-load',
            parentId: 0,
            path: '/kafka-host-load',
            sort: 5
          },
          {
            children: [],
            component: '/kafka-topic-load/index',
            id: 6,
            createAt: '2021-06-15 16:20:00',
            meta: {
              icon: '',
              isAffix: false,
              isEnable: true,
              isKeeAlive: false,
              isLink: false,
              title: 'Topic负载'
            },
            name: 'kafka-topic-load',
            parentId: 0,
            path: '/kafka-topic-load',
            sort: 6
          }
        ],
        msg: '获取菜单列表成功'
      })
    }
  },
  /**
   * 获取用户信息
   * */
  {
    url: '/api/kafka/info/13',
    type: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        data: {
          id: 13,
          username: 'Mason',
          email: 'mason@example.com',
          role: 'admin',
          permissions: [
            'dashboard',
            'kafka-cluster',
            'kafka-overview',
            'kafka-topic',
            'kafka-consumer',
            'kafka-host-load',
            'kafka-topic-load'
          ],
          avatar: 'http://example.com/avatar.jpg',
          createTime: '2021-06-15 16:20:00'
        },
        msg: '获取用户信息成功'
      })
    }
  }
]
