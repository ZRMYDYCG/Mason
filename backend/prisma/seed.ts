import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const PERMISSIONS = [
  'auth:test',
  'user:list',
  'user:add',
  'user:update-profile',
  'user:update',
  'user:delete',
  'user:info',
  'role:list',
  'role:listAll',
  'role:add',
  'role:update',
  'role:delete',
  'role:useMenus',
  'menu:list',
  'menu:listAll',
  'menu:add',
  'menu:update',
  'menu:delete',
  'department:listAll',
  'department:add',
  'department:update',
  'department:delete',
  'log:list',
  'log:delete',
  'upload:single'
] as const

const SUPER_ONLY = new Set([
  'menu:add',
  'menu:update',
  'menu:delete',
  'department:add',
  'department:update',
  'department:delete'
])

type MenuSeed = {
  id: bigint
  name: string
  path: string
  parentId: number
  sort: number
  title: string
  icon?: string
  isLink?: number
  isEnable?: number
  isAffix?: number
  isKeepAlive?: number
}

const menus: MenuSeed[] = [
  { id: 1n, name: 'dashboard', path: '/dashboard', parentId: 0, sort: 1, title: '仪表盘', icon: 'chart-bar', isAffix: 1 },
  { id: 2n, name: 'system', path: '/system', parentId: 0, sort: 2, title: '系统管理', icon: 'settings' },
  { id: 3n, name: 'account-manage', path: '/system/account-manage', parentId: 2, sort: 1, title: '账号管理', icon: 'users' },
  { id: 4n, name: 'role-manage', path: '/system/role-manage', parentId: 2, sort: 2, title: '角色管理', icon: 'shield-check' },
  { id: 5n, name: 'menu-manage', path: '/system/menu-manage', parentId: 2, sort: 3, title: '菜单管理', icon: 'menu' },
  { id: 6n, name: 'department-manage', path: '/system/department-manage', parentId: 2, sort: 4, title: '部门管理', icon: 'network' },
  { id: 7n, name: 'log', path: '/system/log', parentId: 2, sort: 5, title: '操作日志', icon: 'scroll-text' },

  { id: 10n, name: 'features', path: '/features', parentId: 0, sort: 3, title: '功能示例', icon: 'panels-top-left' },
  { id: 11n, name: 'captcha', path: '/features/captcha', parentId: 10, sort: 1, title: '验证码', icon: 'badge-check' },
  { id: 12n, name: 'viewer', path: '/features/viewer', parentId: 10, sort: 2, title: '图片预览', icon: 'images' },
  { id: 13n, name: 'waterfall', path: '/features/waterfall', parentId: 10, sort: 3, title: '瀑布流', icon: 'layout-grid' },

  { id: 20n, name: 'menu', path: '/menu', parentId: 0, sort: 4, title: '多级菜单', icon: 'folder-tree', isKeepAlive: 1 },
  { id: 21n, name: 'menu1', path: '/menu/menu1', parentId: 20, sort: 1, title: '菜单1', isKeepAlive: 1 },
  { id: 22n, name: 'menu2', path: '/menu/menu2', parentId: 20, sort: 2, title: '菜单2', isKeepAlive: 1 },
  { id: 23n, name: 'menu21', path: '/menu/menu2/menu21', parentId: 22, sort: 1, title: '菜单2-1', isKeepAlive: 1 },
  { id: 24n, name: 'menu22', path: '/menu/menu2/menu22', parentId: 22, sort: 2, title: '菜单2-2', isKeepAlive: 1 },
  { id: 25n, name: 'menu221', path: '/menu/menu2/menu22/menu221', parentId: 24, sort: 1, title: '菜单2-2-1', isKeepAlive: 1 },
  { id: 26n, name: 'menu222', path: '/menu/menu2/menu22/menu222', parentId: 24, sort: 2, title: '菜单2-2-2', isKeepAlive: 1 },
  { id: 27n, name: 'menu23', path: '/menu/menu2/menu23', parentId: 22, sort: 3, title: '菜单2-3', isKeepAlive: 1 },
  { id: 28n, name: 'menu3', path: '/menu/menu3', parentId: 20, sort: 3, title: '菜单3', isKeepAlive: 1 },

  { id: 30n, name: 'visualization', path: '/visualization', parentId: -1, sort: 5, title: '数据大屏', icon: 'monitor-dot', isKeepAlive: 1 },
  { id: 31n, name: 'local-svg', path: '/local-svg', parentId: 0, sort: 6, title: '图标展示', icon: 'badge' },
  { id: 32n, name: 'vue-directive', path: '/vue-directive', parentId: 0, sort: 7, title: '自定义指令', icon: 'mouse-pointer-click' },
  { id: 33n, name: 'jump-confirmation', path: '/jump-confirmation', parentId: 0, sort: 8, title: '跳转确认', icon: 'route' }
]

async function resetTables() {
  await prisma.sysRolePermission.deleteMany()
  await prisma.sysPermission.deleteMany()
  await prisma.sysRoleMenu.deleteMany()
  await prisma.sysUserRole.deleteMany()
  await prisma.sysLog.deleteMany()
  await prisma.sysUser.deleteMany()
  await prisma.sysMenu.deleteMany()
  await prisma.sysRole.deleteMany()
  await prisma.sysDepartment.deleteMany()
}

async function seedBaseData() {
  await prisma.sysDepartment.createMany({
    data: [
      { id: 1, name: 'Mason科技', parentId: 0, sort: 1, isEnable: 1 },
      { id: 2, name: '研发中心', parentId: 1, sort: 1, isEnable: 1 },
      { id: 3, name: '产品设计', parentId: 1, sort: 2, isEnable: 1 },
      { id: 4, name: '前端开发', parentId: 2, sort: 1, isEnable: 1 },
      { id: 5, name: '测试团队', parentId: 2, sort: 2, isEnable: 1 }
    ]
  })

  await prisma.sysRole.createMany({
    data: [
      { id: 1n, role: 'super_admin', roleName: '超级管理员', isSuper: 1, remark: '系统内置超管' },
      { id: 2n, role: 'user', roleName: '普通用户', isSuper: 0, remark: '系统内置普通用户' }
    ]
  })

  await prisma.sysUser.createMany({
    data: [
      {
        id: 1n,
        username: 'Mason',
        password: bcrypt.hashSync('123456', 10),
        name: 'Mason',
        deptId: 4,
        email: '547471919@qq.com',
        phone: '15170536808',
        remark: '超级管理员'
      },
      {
        id: 2n,
        username: 'Coder',
        password: bcrypt.hashSync('123456', 10),
        name: '一勺',
        deptId: 4,
        email: '547471919@qq.com',
        phone: '15170536808',
        remark: '普通用户'
      }
    ]
  })

  await prisma.sysUserRole.createMany({
    data: [
      { userId: 1n, roleId: 1n },
      { userId: 2n, roleId: 2n }
    ]
  })

  await prisma.sysMenu.createMany({
    data: menus.map((menu) => ({
      id: menu.id,
      name: menu.name,
      path: menu.path,
      parentId: menu.parentId,
      sort: menu.sort,
      title: menu.title,
      icon: menu.icon || '',
      isLink: menu.isLink ?? 0,
      isEnable: menu.isEnable ?? 1,
      isAffix: menu.isAffix ?? 0,
      isKeepAlive: menu.isKeepAlive ?? 0
    }))
  })
}

async function seedRoleMenus() {
  await prisma.sysRoleMenu.createMany({
    data: menus.map((menu) => ({ roleId: 1n, menuId: menu.id }))
  })

  const normalRoleMenuIds = [1n, 10n, 11n, 12n, 13n, 20n, 21n, 22n, 23n, 24n, 25n, 26n, 27n, 28n, 30n, 31n, 32n, 33n]
  await prisma.sysRoleMenu.createMany({
    data: normalRoleMenuIds.map((menuId) => ({ roleId: 2n, menuId })),
    skipDuplicates: true
  })
}

async function seedPermissions() {
  for (const code of PERMISSIONS) {
    const [resource, action] = code.split(':')
    await prisma.sysPermission.create({
      data: { code, name: code, resource, action }
    })
  }

  const permissions = await prisma.sysPermission.findMany()
  await prisma.sysRolePermission.createMany({
    data: permissions.map((permission) => ({ roleId: 1n, permissionId: permission.id }))
  })

  await prisma.sysRolePermission.createMany({
    data: permissions
      .filter((permission) => !SUPER_ONLY.has(permission.code))
      .map((permission) => ({ roleId: 2n, permissionId: permission.id }))
  })
}

async function main() {
  await resetTables()
  await seedBaseData()
  await seedRoleMenus()
  await seedPermissions()
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
