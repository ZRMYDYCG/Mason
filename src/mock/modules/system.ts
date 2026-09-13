import Mock from 'mockjs'
import type { Department, Menu, Role, SystemLog, User } from '@/api/interface/system'

type MockOption = {
  url: string
  body?: string
}

type RawMenu = Omit<Menu, 'children'>

const now = () => Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')

const ok = <T>(data: T, msg = '操作成功') => ({ code: 200, msg, data })
const fail = (msg: string, code = 500) => ({ code, msg, data: null })

const readBody = <T extends Record<string, any>>(option: MockOption): T => {
  if (!option.body) return {} as T
  try {
    return JSON.parse(option.body)
  } catch {
    return {} as T
  }
}

const paginate = <T>(list: T[], pageNo = 1, pageSize = 10) => {
  const start = (Number(pageNo) - 1) * Number(pageSize)
  return {
    count: list.length,
    rows: list.slice(start, start + Number(pageSize))
  }
}

const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data))

const buildTree = <T extends { id: number; parentId: number; sort?: number; children?: T[] }>(
  list: T[]
): T[] => {
  const map = new Map<number, T>()
  const roots: T[] = []

  list
    .map((item) => ({ ...item, children: [] }) as T)
    .sort((a, b) => Number(a.sort || 0) - Number(b.sort || 0))
    .forEach((item) => map.set(item.id, item))

  map.forEach((item) => {
    const parent = map.get(item.parentId)
    if (item.parentId !== 0 && parent) {
      parent.children = parent.children || []
      parent.children.push(item)
    } else {
      roots.push(item)
    }
  })

  const prune = (items: T[]): T[] =>
    items.map((item) => {
      if (!item.children?.length) {
        const { children: _children, ...rest } = item
        return rest as T
      }
      return { ...item, children: prune(item.children) }
    })

  return prune(roots)
}

const removeTreeNode = <T extends { id: number; parentId: number }>(list: T[], id: number) => {
  const ids = new Set<number>([id])
  let changed = true

  while (changed) {
    changed = false
    list.forEach((item) => {
      if (ids.has(item.parentId) && !ids.has(item.id)) {
        ids.add(item.id)
        changed = true
      }
    })
  }

  return list.filter((item) => !ids.has(item.id))
}

const makeMenu = (
  id: number,
  name: string,
  title: string,
  path: string,
  parentId: number,
  icon = '',
  sort = id,
  options: Partial<RawMenu['meta']> = {}
): RawMenu => ({
  id,
  name,
  path,
  component: `${path}/index`,
  parentId,
  sort,
  meta: {
    icon,
    title,
    isLink: options.isLink ?? false,
    isEnable: options.isEnable ?? true,
    isAffix: options.isAffix ?? false,
    isKeepAlive: options.isKeepAlive ?? false
  },
  createdAt: now()
})

let menus: RawMenu[] = [
  makeMenu(1, 'dashboard', '仪表盘', '/dashboard', 0, 'chart-bar', 1, { isAffix: true }),
  makeMenu(2, 'system', '系统管理', '/system', 0, 'settings', 2),
  makeMenu(3, 'accountManage', '账号管理', '/system/accountManage', 2, 'users', 1),
  makeMenu(4, 'roleManage', '角色管理', '/system/roleManage', 2, 'shield-check', 2),
  makeMenu(5, 'menuManage', '菜单管理', '/system/menuManage', 2, 'menu', 3),
  makeMenu(6, 'departmentManage', '部门管理', '/system/departmentManage', 2, 'network', 4),
  makeMenu(7, 'log', '操作日志', '/system/log', 2, 'scroll-text', 5),
  makeMenu(10, 'features', '功能示例', '/features', 0, 'panels-top-left', 3),
  makeMenu(11, 'captcha', '验证码', '/features/captcha', 10, 'badge-check', 1),
  makeMenu(12, 'viewer', '图片预览', '/features/viewer', 10, 'images', 2),
  makeMenu(13, 'waterfall', '瀑布流', '/features/waterfall', 10, 'layout-grid', 3),
  makeMenu(20, 'menu', '多级菜单', '/menu', 0, 'folder-tree', 4, { isKeepAlive: true }),
  makeMenu(21, 'menu1', '菜单1', '/menu/menu1', 20, '', 1, { isKeepAlive: true }),
  makeMenu(22, 'menu2', '菜单2', '/menu/menu2', 20, '', 2, { isKeepAlive: true }),
  makeMenu(23, 'menu21', '菜单2-1', '/menu/menu2/menu21', 22, '', 1, { isKeepAlive: true }),
  makeMenu(24, 'menu22', '菜单2-2', '/menu/menu2/menu22', 22, '', 2, { isKeepAlive: true }),
  makeMenu(25, 'menu221', '菜单2-2-1', '/menu/menu2/menu22/menu221', 24, '', 1, {
    isKeepAlive: true
  }),
  makeMenu(26, 'menu222', '菜单2-2-2', '/menu/menu2/menu22/menu222', 24, '', 2, {
    isKeepAlive: true
  }),
  makeMenu(27, 'menu23', '菜单2-3', '/menu/menu2/menu23', 22, '', 3, { isKeepAlive: true }),
  makeMenu(28, 'menu3', '菜单3', '/menu/menu3', 20, '', 3, { isKeepAlive: true }),
  makeMenu(30, 'visualization', '数据大屏', '/visualization', -1, 'monitor-dot', 5, {
    isKeepAlive: true
  }),
  makeMenu(31, 'local-svg', '图标展示', '/local-svg', 0, 'badge', 6),
  makeMenu(32, 'vue-directive', '自定义指令', '/vue-directive', 0, 'mouse-pointer-click', 7),
  makeMenu(33, 'jump-confirmation', '跳转确认', '/jump-confirmation', 0, 'route', 8),
  {
    ...makeMenu(34, 'docs', '文档中心', '/docs', 0, 'book-open-text', 9),
    component: '/document/index'
  }
]

let roleMenus: Record<number, number[]> = {
  1: menus.map((menu) => menu.id),
  2: [1, 10, 11, 12, 13, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31, 32, 33, 34],
  3: [1, 7, 30, 34]
}

let roles: Role[] = [
  { id: 1, role: 'super_admin', roleName: '超级管理员', isSuper: 1, remark: '系统内置超管', createdAt: now() },
  { id: 2, role: 'user', roleName: '普通用户', isSuper: 0, remark: '系统内置普通用户', createdAt: now() },
  { id: 3, role: 'auditor', roleName: '审计员', isSuper: 0, remark: '查看日志和数据看板', createdAt: now() }
]

let departments: Department[] = [
  { id: 1, parentId: 0, name: 'Mason科技', sort: 1, isEnable: 1, createdAt: now() },
  { id: 2, parentId: 1, name: '研发中心', sort: 1, isEnable: 1, createdAt: now() },
  { id: 3, parentId: 1, name: '产品设计', sort: 2, isEnable: 1, createdAt: now() },
  { id: 4, parentId: 2, name: '前端开发', sort: 1, isEnable: 1, createdAt: now() },
  { id: 5, parentId: 2, name: '测试团队', sort: 2, isEnable: 1, createdAt: now() }
]

const roleOf = (roleId: number) => roles.find((role) => role.id === roleId) || roles[1]

let users: User[] = [
  {
    id: 1,
    name: 'Mason',
    username: 'Mason',
    deptId: 4,
    email: '547471919@qq.com',
    phone: '15170536808',
    avatar: null,
    remark: '超级管理员',
    roleId: 1,
    role: 'super_admin',
    roleName: '超级管理员'
  },
  {
    id: 2,
    name: '一勺',
    username: 'Coder',
    deptId: 4,
    email: '547471919@qq.com',
    phone: '15170536808',
    avatar: null,
    remark: '普通用户',
    roleId: 2,
    role: 'user',
    roleName: '普通用户'
  },
  {
    id: 3,
    name: 'Demo',
    username: 'admin',
    deptId: 1,
    email: 'admin@mason.local',
    phone: '13800000003',
    avatar: null,
    remark: 'mock 演示便捷账号，密码任意',
    roleId: 1,
    role: 'super_admin',
    roleName: '超级管理员'
  },
  {
    id: 4,
    name: 'Auditor',
    username: 'auditor',
    deptId: 5,
    email: 'audit@mason.local',
    phone: '13800000004',
    avatar: null,
    remark: '日志审计演示账号',
    roleId: 3,
    role: 'auditor',
    roleName: '审计员'
  }
]

let logs: SystemLog[] = Array.from({ length: 36 }).map((_, index) => ({
  id: index + 1,
  userId: Mock.Random.pick([1, 2, 3, 4]),
  username: Mock.Random.pick(['Mason', 'Coder', 'admin', 'auditor']),
  method: Mock.Random.pick(['GET', 'POST', 'POST', 'DELETE']),
  path: Mock.Random.pick(['/login', '/menu/list', '/user/list', '/role/update', '/dashboard/summary', '/captcha/verify']),
  status: Mock.Random.pick([200, 200, 200, 401, 404, 500]),
  ip: Mock.Random.ip(),
  userAgent: 'Mock Browser',
  requestParams: JSON.stringify({ mock: true, index }),
  duration: Mock.Random.integer(12, 480),
  createdAt: now()
}))

const getMenuTree = (ids = menus.map((menu) => menu.id)) => {
  const allowed = new Set(ids)
  const list = menus.filter((menu) => allowed.has(menu.id) && menu.meta.isEnable)
  return buildTree(clone(list))
}

const writeLog = (method: string, path: string, username = 'admin') => {
  logs.unshift({
    id: Math.max(0, ...logs.map((item) => item.id)) + 1,
    userId: 1,
    username,
    method,
    path,
    status: 200,
    ip: '127.0.0.1',
    userAgent: 'Mock Browser',
    requestParams: '{}',
    duration: Mock.Random.integer(10, 160),
    createdAt: now()
  })
}

const syncUserRole = (user: User) => {
  const role = roleOf(user.roleId)
  user.role = role.role
  user.roleName = role.roleName
  return user
}

const nextId = (list: { id: number }[]) => Math.max(0, ...list.map((item) => item.id)) + 1

const captchaStore = new Map<string, any>()
const svg = (text: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="42"><rect width="120" height="42" rx="8" fill="#f4f7ff"/><text x="18" y="28" font-size="22" font-family="Arial" fill="#2254F4">${text}</text></svg>`

export default [
  {
    url: '/login',
    type: 'post',
    response: (option: MockOption) => {
      const body = readBody<{ username: string; expires7d?: boolean }>(option)
      const username = body.username || 'admin'
      let user = users.find((item) => item.username === username)

      if (!user) {
        user = syncUserRole({
          id: nextId(users),
          username,
          name: username,
          deptId: 1,
          email: `${username}@mason.local`,
          phone: '',
          avatar: null,
          remark: '登录时自动创建的 mock 用户',
          roleId: 2,
          role: '',
          roleName: ''
        })
        users.push(user)
      }

      writeLog('POST', '/login', user.username || 'admin')
      return ok(
        {
          id: user.id,
          username: user.username,
          expires: Date.now() + (body.expires7d ? 7 : 1) * 24 * 60 * 60 * 1000
        },
        '登录成功'
      )
    }
  },
  {
    url: '/register',
    type: 'post',
    response: (option: MockOption) => {
      const body = readBody<{ username: string }>(option)
      if (!body.username) return fail('请输入用户名')
      if (users.some((item) => item.username === body.username)) return fail('用户名已存在', 400)

      users.push(
        syncUserRole({
          id: nextId(users),
          username: body.username,
          name: body.username,
          deptId: 1,
          email: null,
          phone: null,
          avatar: null,
          remark: '注册创建的 mock 用户',
          roleId: 2,
          role: '',
          roleName: ''
        })
      )
      return ok(null, '注册成功')
    }
  },
  {
    url: '/logout',
    type: 'post',
    response: () => ok(null, '退出成功')
  },
  {
    url: '/user/\\d+',
    type: 'get',
    response: (option: MockOption) => {
      const id = Number(option.url.match(/\/user\/(\d+)/)?.[1] || 1)
      const user = users.find((item) => item.id === id) || users[0]
      const role = roleOf(user.roleId)
      return ok({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        remark: user.remark,
        roleId: user.roleId,
        role: role.role,
        roleName: role.roleName,
        isSuper: role.isSuper
      })
    }
  },
  {
    url: '/menu/list/?$',
    type: 'post',
    response: () => ok(getMenuTree(roleMenus[1]))
  },
  {
    url: '/menu/listAll',
    type: 'post',
    response: () => ok(buildTree(clone(menus)))
  },
  {
    url: '/menu/list$',
    type: 'post',
    response: (option: MockOption) => {
      const body = readBody<{ title?: string; isEnable?: number }>(option)
      let list = menus
      if (body.title) list = list.filter((item) => item.meta.title.includes(body.title || ''))
      if (body.isEnable !== undefined && Number(body.isEnable) !== 2) {
        list = list.filter((item) => Number(item.meta.isEnable) === Number(body.isEnable))
      }
      return ok(buildTree(clone(list)))
    }
  },
  {
    url: '/menu/add',
    type: 'post',
    response: () => fail('Mock 演示模式下菜单维护不可用', 400)
  },
  {
    url: '/menu/update',
    type: 'post',
    response: () => fail('Mock 演示模式下菜单维护不可用', 400)
  },
  {
    url: '/menu/delete',
    type: 'post',
    response: () => fail('Mock 演示模式下菜单维护不可用', 400)
  },
  {
    url: '/role/listAll',
    type: 'post',
    response: () => ok(clone(roles))
  },
  {
    url: '/role/list',
    type: 'post',
    response: (option: MockOption) => {
      const body = readBody<any>(option)
      let list = roles
      if (body.role) list = list.filter((item) => item.role.includes(body.role))
      if (Number(body.isSuper) !== 2) list = list.filter((item) => item.isSuper === Number(body.isSuper))
      return ok(paginate(clone(list), body.pageNo, body.pageSize))
    }
  },
  {
    url: '/role/useMenus',
    type: 'post',
    response: (option: MockOption) => {
      const { roleId } = readBody<{ roleId: number }>(option)
      return ok(roleMenus[Number(roleId)] || [])
    }
  },
  {
    url: '/role/add',
    type: 'post',
    response: (option: MockOption) => {
      const body = readBody<any>(option)
      const role: Role = {
        id: nextId(roles),
        role: body.role,
        roleName: body.roleName,
        isSuper: Number(body.isSuper || 0),
        remark: body.remark || '',
        createdAt: now()
      }
      roles.push(role)
      roleMenus[role.id] = body.menus || []
      return ok(null, '新增角色成功')
    }
  },
  {
    url: '/role/update',
    type: 'post',
    response: (option: MockOption) => {
      const body = readBody<any>(option)
      const role = roles.find((item) => item.id === Number(body.id))
      if (!role) return fail('角色不存在', 404)
      role.role = body.role
      role.roleName = body.roleName
      role.isSuper = Number(body.isSuper || 0)
      role.remark = body.remark || ''
      roleMenus[role.id] = body.menus || []
      users.filter((user) => user.roleId === role.id).forEach(syncUserRole)
      return ok(null, '更新角色成功')
    }
  },
  {
    url: '/role/delete',
    type: 'post',
    response: (option: MockOption) => {
      const { id } = readBody<{ id: number }>(option)
      if ([1, 2].includes(Number(id))) return fail('演示内置角色不允许删除', 400)
      roles = roles.filter((item) => item.id !== Number(id))
      delete roleMenus[Number(id)]
      return ok(null, '删除角色成功')
    }
  },
  {
    url: '/department/listAll',
    type: 'post',
    response: () => ok(buildTree(clone(departments)))
  },
  {
    url: '/department/add',
    type: 'post',
    response: (option: MockOption) => {
      const body = readBody<any>(option)
      departments.push({
        id: nextId(departments),
        name: body.name,
        parentId: Number(body.parentId || 1),
        sort: Number(body.sort || 1),
        isEnable: 1,
        createdAt: now()
      })
      return ok(null, '新增部门成功')
    }
  },
  {
    url: '/department/update',
    type: 'post',
    response: (option: MockOption) => {
      const body = readBody<any>(option)
      const dept = departments.find((item) => item.id === Number(body.id))
      if (!dept) return fail('部门不存在', 404)
      dept.name = body.name
      dept.parentId = Number(body.parentId || 0)
      dept.sort = Number(body.sort || 1)
      return ok(null, '更新部门成功')
    }
  },
  {
    url: '/department/delete',
    type: 'post',
    response: (option: MockOption) => {
      const { id } = readBody<{ id: number }>(option)
      if (Number(id) === 1) return fail('根部门不允许删除', 400)
      departments = removeTreeNode(departments, Number(id))
      return ok(null, '删除部门成功')
    }
  },
  {
    url: '/user/list',
    type: 'post',
    response: (option: MockOption) => {
      const body = readBody<any>(option)
      let list = users.map(syncUserRole)
      if (body.username) list = list.filter((item) => item.username?.includes(body.username))
      if (body.deptId) {
        const collectDeptIds = (items: Department[]): number[] =>
          items.flatMap((item) => [item.id, ...collectDeptIds(item.children || [])])
        const deptRoot = buildTree(departments).find((item) => item.id === Number(body.deptId))
        const deptIds = new Set(deptRoot ? collectDeptIds([deptRoot]) : [Number(body.deptId)])
        deptIds.add(Number(body.deptId))
        list = list.filter((item) => deptIds.has(item.deptId))
      }
      return ok(paginate(clone(list), body.pageNo, body.pageSize))
    }
  },
  {
    url: '/user/add',
    type: 'post',
    response: (option: MockOption) => {
      const body = readBody<any>(option)
      if (users.some((item) => item.username === body.username)) return fail('用户名已存在', 400)
      users.push(
        syncUserRole({
          id: nextId(users),
          username: body.username,
          name: body.name,
          deptId: Number(body.deptId || 1),
          email: body.email || null,
          phone: body.phone || null,
          avatar: null,
          remark: body.remark || '',
          roleId: Number(body.roleId || 2),
          role: '',
          roleName: ''
        })
      )
      return ok(null, '新增用户成功')
    }
  },
  {
    url: '/user/update',
    type: 'post',
    response: (option: MockOption) => {
      const body = readBody<any>(option)
      const user = users.find((item) => item.id === Number(body.id))
      if (!user) return fail('用户不存在', 404)
      Object.assign(user, {
        username: body.username,
        name: body.name,
        deptId: Number(body.deptId || 1),
        roleId: Number(body.roleId || 2),
        phone: body.phone || null,
        email: body.email || null,
        remark: body.remark || ''
      })
      syncUserRole(user)
      return ok(null, '更新用户成功')
    }
  },
  {
    url: '/user/delete',
    type: 'post',
    response: (option: MockOption) => {
      const { id } = readBody<{ id: number }>(option)
      if (Number(id) === 1) return fail('内置管理员不允许删除', 400)
      users = users.filter((item) => item.id !== Number(id))
      return ok(null, '删除用户成功')
    }
  },
  {
    url: '/user/update-profile',
    type: 'post',
    response: () => ok({ avatar: '' }, '资料已更新')
  },
  {
    url: '/log/list',
    type: 'post',
    response: (option: MockOption) => {
      const body = readBody<any>(option)
      let list = logs
      if (body.username) list = list.filter((item) => item.username?.includes(body.username))
      if (body.path) list = list.filter((item) => item.path.includes(body.path))
      if (body.method) list = list.filter((item) => item.method === body.method)
      if (body.status) list = list.filter((item) => item.status === Number(body.status))
      return ok(paginate(clone(list), body.pageNo, body.pageSize))
    }
  },
  {
    url: '/log/delete',
    type: 'post',
    response: (option: MockOption) => {
      const { id } = readBody<{ id: number }>(option)
      logs = logs.filter((item) => item.id !== Number(id))
      return ok(null, '删除日志成功')
    }
  },
  {
    url: '/captcha/graphic',
    type: 'get',
    response: () => {
      const id = Mock.Random.guid()
      captchaStore.set(id, 'mason')
      return ok({ id, svg: svg('mason') })
    }
  },
  {
    url: '/captcha/arithmetic',
    type: 'get',
    response: () => {
      const id = Mock.Random.guid()
      const a = Mock.Random.integer(1, 9)
      const b = Mock.Random.integer(1, 9)
      captchaStore.set(id, String(a + b))
      return ok({ id, svg: svg(`${a}+${b}=?`) })
    }
  },
  {
    url: '/captcha/slider',
    type: 'get',
    response: () => {
      const id = Mock.Random.guid()
      captchaStore.set(id, 42)
      return ok({
        id,
        bgUrl: 'https://picsum.photos/320/160?random=slider',
        puzzleUrl: 'https://picsum.photos/60/60?random=puzzle',
        y: 48
      })
    }
  },
  {
    url: '/captcha/rotate',
    type: 'get',
    response: () => {
      const id = Mock.Random.guid()
      captchaStore.set(id, 0)
      return ok({ id, imgUrl: 'https://picsum.photos/160/160?random=rotate' })
    }
  },
  {
    url: '/captcha/click',
    type: 'get',
    response: () => {
      const id = Mock.Random.guid()
      captchaStore.set(id, true)
      return ok({ id, imgUrl: 'https://picsum.photos/320/180?random=click', prompt: '请点击图中醒目的位置' })
    }
  },
  {
    url: '/captcha/verify',
    type: 'post',
    response: (option: MockOption) => {
      const body = readBody<{ id: string; answer: any }>(option)
      const answer = captchaStore.get(body.id)
      if (answer === undefined) return fail('验证码已失效', 400)
      if (answer === true || String(body.answer).trim().toLowerCase() === String(answer).toLowerCase()) {
        captchaStore.delete(body.id)
        return ok(null, '验证成功')
      }
      return fail('验证失败', 400)
    }
  }
]
