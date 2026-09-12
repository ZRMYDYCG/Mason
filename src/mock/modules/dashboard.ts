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

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default [
  {
    url: '/dashboard/summary',
    type: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'ok',
        data: {
          visits: 12486,
          visitsDelta: 12,
          activeUsers: 1268,
          activeUsersDelta: 8,
          pendingTodos: 86,
          pendingTodosDelta: 24,
          errorRate: 0.3,
          errorRateDelta: -12
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

      // Year-like range → monthly series matching the design chart
      if (span > 60) {
        const visitsBase = [8200, 9100, 8800, 10200, 9800, 11200, 10800, 12400, 11800, 13100, 12800, 14200]
        const activeBase = [620, 680, 710, 760, 740, 820, 860, 940, 900, 980, 1020, 1100]
        const year = new Date(endDate).getFullYear()
        const data = MONTH_LABELS.map((label, idx) => ({
          date: `${year}-${String(idx + 1).padStart(2, '0')}-01`,
          label,
          visits: visitsBase[idx] + Mock.Random.integer(-180, 180),
          activeUsers: activeBase[idx] + Mock.Random.integer(-30, 30)
        }))
        return { code: 200, msg: 'ok', data }
      }

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

      return { code: 200, msg: 'ok', data }
    }
  },
  {
    url: '/dashboard/todos',
    type: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'ok',
        data: [
          {
            id: '1',
            title: 'Refine dashboard design',
            priority: 'high',
            dueAt: '2026-09-12 18:00:00',
            status: 'done'
          },
          {
            id: '2',
            title: 'Prepare UI showcase assets',
            priority: 'high',
            dueAt: '2026-09-13 18:00:00',
            status: 'todo'
          },
          {
            id: '3',
            title: 'Review design system',
            priority: 'medium',
            dueAt: '2026-09-14 18:00:00',
            status: 'todo'
          },
          {
            id: '4',
            title: 'Plan next iteration',
            priority: 'medium',
            dueAt: '2026-09-15 18:00:00',
            status: 'todo'
          },
          {
            id: '5',
            title: 'Take a break ☕',
            priority: 'low',
            dueAt: '2026-09-16 18:00:00',
            status: 'todo'
          }
        ]
      }
    }
  },
  {
    url: '/dashboard/activities',
    type: 'get',
    response: () => {
      const now = Date.now()
      return {
        code: 200,
        msg: 'ok',
        data: [
          {
            id: '1',
            actor: 'Mason',
            action: '发布',
            target: 'Mason v2.0 is now live!',
            at: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
            level: 'success'
          },
          {
            id: '2',
            actor: 'Design',
            action: '更新',
            target: 'New design system components',
            at: new Date(now - 24 * 60 * 60 * 1000).toISOString(),
            level: 'info'
          },
          {
            id: '3',
            actor: 'Ops',
            action: '优化',
            target: 'Performance improvements shipped',
            at: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
            level: 'info'
          },
          {
            id: '4',
            actor: 'Docs',
            action: '发布',
            target: 'Documentation refresh complete',
            at: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
            level: 'success'
          }
        ]
      }
    }
  },
  {
    url: '/dashboard/systemHealth',
    type: 'get',
    response: () => {
      const cpu = clampPercent(Mock.Random.integer(18, 48))
      const memory = clampPercent(Mock.Random.integer(22, 55))
      const disk = clampPercent(Mock.Random.integer(35, 62))

      return {
        code: 200,
        msg: 'ok',
        data: {
          cpu,
          memory,
          disk,
          status: 'healthy',
          version: '1.0.9',
          buildTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
        }
      }
    }
  }
]
