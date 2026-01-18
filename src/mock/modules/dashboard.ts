import Mock from 'mockjs'

function parseQuery(url: string) {
  const search = url.split('?')[1]
  if (!search) return {}
  return JSON.parse(
    '{"' +
      decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
      '"}'
  )
}

function clampPercent(val: number) {
  if (val < 0) return 0
  if (val > 100) return 100
  return Math.round(val)
}

function daysBetween(startDate: string, endDate: string) {
  const s = new Date(startDate)
  const e = new Date(endDate)
  const ms = e.getTime() - s.getTime()
  if (Number.isNaN(ms)) return 7
  return Math.max(1, Math.floor(ms / (24 * 60 * 60 * 1000)) + 1)
}

function toDateKey(d: Date) {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function addDays(dateKey: string, offset: number) {
  const d = new Date(dateKey)
  d.setDate(d.getDate() + offset)
  return toDateKey(d)
}

export default [
  {
    url: '/dashboard/summary',
    type: 'get',
    response: (options: any) => {
      const query = parseQuery(options.url)
      const startDate = (query.startDate as string) || toDateKey(new Date())
      const endDate = (query.endDate as string) || toDateKey(new Date())
      const span = daysBetween(startDate, endDate)

      const baseVisits = Mock.Random.integer(30000, 120000)
      const baseActive = Mock.Random.integer(1500, 8000)
      const baseTodos = Mock.Random.integer(6, 42)
      const baseError = Mock.Random.float(0.1, 1.8, 1, 2)

      const deltaScale = Math.max(0.6, Math.min(1.4, 7 / span))
      const visitsDelta = Mock.Random.float(-12, 18, 1, 1) * deltaScale
      const activeUsersDelta = Mock.Random.float(-10, 16, 1, 1) * deltaScale
      const pendingTodosDelta = Mock.Random.float(-15, 20, 1, 1) * deltaScale
      const errorRateDelta = Mock.Random.float(-25, 12, 1, 1) * deltaScale

      return {
        code: 200,
        msg: 'ok',
        data: {
          visits: baseVisits,
          visitsDelta,
          activeUsers: baseActive,
          activeUsersDelta,
          pendingTodos: baseTodos,
          pendingTodosDelta,
          errorRate: baseError,
          errorRateDelta
        }
      }
    }
  },
  {
    url: '/dashboard/trend',
    type: 'get',
    response: (options: any) => {
      const query = parseQuery(options.url)
      const startDate = (query.startDate as string) || addDays(toDateKey(new Date()), -6)
      const endDate = (query.endDate as string) || toDateKey(new Date())
      const span = daysBetween(startDate, endDate)

      const base = Mock.Random.integer(1800, 5200)
      const peakAt = Mock.Random.integer(0, span - 1)

      const data = Array.from({ length: span }).map((_, idx) => {
        const date = addDays(startDate, idx)
        const noise = Mock.Random.integer(-260, 260)
        const peakBoost = idx === peakAt ? Mock.Random.integer(900, 1600) : 0
        const visits = Math.max(0, base + idx * Mock.Random.integer(-30, 40) + noise + peakBoost)
        const activeUsers = Math.max(
          0,
          Math.round(visits * Mock.Random.float(0.18, 0.35, 2, 2) + Mock.Random.integer(-80, 120))
        )
        return { date, visits, activeUsers }
      })

      return {
        code: 200,
        msg: 'ok',
        data
      }
    }
  },
  {
    url: '/dashboard/todos',
    type: 'get',
    response: () => {
      const now = new Date()
      const list = [
        {
          id: Mock.Random.guid(),
          title: '复核本周访问异常波动原因',
          priority: 'high',
          dueAt: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
          status: Mock.Random.pick(['todo', 'doing'])
        },
        {
          id: Mock.Random.guid(),
          title: '更新角色权限：运营只读范围',
          priority: 'medium',
          dueAt: toDateKey(new Date(now.getTime() + 24 * 60 * 60 * 1000)) + ' 18:00:00',
          status: 'todo'
        },
        {
          id: Mock.Random.guid(),
          title: '检查缓存命中率与慢查询',
          priority: 'medium',
          dueAt: toDateKey(new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)) + ' 16:30:00',
          status: 'doing'
        },
        {
          id: Mock.Random.guid(),
          title: '梳理告警阈值，减少误报',
          priority: 'low',
          dueAt: toDateKey(new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)) + ' 12:00:00',
          status: 'todo'
        }
      ]

      return {
        code: 200,
        msg: 'ok',
        data: list
      }
    }
  },
  {
    url: '/dashboard/activities',
    type: 'get',
    response: () => {
      const list = [
        {
          id: Mock.Random.guid(),
          actor: 'Mason',
          action: '发布',
          target: 'dashboard 热修复',
          at: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
          level: 'success'
        },
        {
          id: Mock.Random.guid(),
          actor: Mock.Random.cname(),
          action: '调整',
          target: '菜单权限配置',
          at: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
          level: 'info'
        },
        {
          id: Mock.Random.guid(),
          actor: Mock.Random.cname(),
          action: '触发',
          target: '高优告警：错误率升高',
          at: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
          level: 'warning'
        }
      ]

      return {
        code: 200,
        msg: 'ok',
        data: list
      }
    }
  },
  {
    url: '/dashboard/systemHealth',
    type: 'get',
    response: () => {
      const cpu = clampPercent(Mock.Random.integer(18, 86))
      const memory = clampPercent(Mock.Random.integer(22, 92))
      const disk = clampPercent(Mock.Random.integer(35, 88))
      const status = cpu > 80 || memory > 85 ? 'warning' : 'healthy'

      return {
        code: 200,
        msg: 'ok',
        data: {
          cpu,
          memory,
          disk,
          status,
          version: '1.0.9',
          buildTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
        }
      }
    }
  }
]
