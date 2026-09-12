export const toNumber = (value: bigint | number | null | undefined) =>
  typeof value === 'bigint' ? Number(value) : value

export const serializeBigInt = <T>(value: T): T =>
  JSON.parse(
    JSON.stringify(value, (_key, inner) => (typeof inner === 'bigint' ? Number(inner) : inner))
  )

export const omitKeys = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj }
  for (const key of keys) delete result[key]
  return result
}

export type MenuRecord = {
  id: bigint | number
  name: string
  path: string
  parentId: number
  sort: number | null
  title: string
  icon: string | null
  isEnable: number | null
  isLink: number | null
  isAffix: number | null
  isKeepAlive: number | null
  createdAt: Date | string | null
}

export type MenuTreeNode = {
  id: number
  name: string
  path: string
  component: string
  parentId: number
  sort: number | null
  meta: {
    title: string
    icon: string | null
    isEnable: boolean
    isLink: boolean
    isAffix: boolean
    isKeepAlive: boolean
  }
  createdAt: Date | string | null
  children: MenuTreeNode[]
}

export const formatMenus = (menus: MenuRecord[]): MenuTreeNode[] => {
  const menuList: MenuTreeNode[] = menus.map((menu) => ({
    id: Number(toNumber(menu.id) ?? 0),
    name: menu.name,
    path: menu.path,
    component: `${menu.path}/index`,
    parentId: menu.parentId,
    sort: menu.sort,
    meta: {
      title: menu.title,
      icon: menu.icon,
      isEnable: menu.isEnable === 1,
      isLink: menu.isLink === 1,
      isAffix: menu.isAffix === 1,
      isKeepAlive: menu.isKeepAlive === 1
    },
    createdAt: menu.createdAt,
    children: []
  }))

  menuList.sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0))
  const map = new Map<number, MenuTreeNode>()
  const roots: MenuTreeNode[] = []
  for (const item of menuList) map.set(item.id, item)
  for (const item of menuList) {
    const parent = map.get(item.parentId)
    if (item.parentId !== 0 && parent) parent.children.push(item)
    else roots.push(item)
  }
  return roots
}

export type DepartmentRecord = {
  id: number
  parentId: number
  name: string
  sort?: number | null
  isEnable?: number | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deletedAt?: Date | string | null
}

export type DepartmentTreeNode = DepartmentRecord & {
  children: DepartmentTreeNode[]
}

export const buildTreeDepartment = (departments: DepartmentRecord[]): DepartmentTreeNode[] => {
  const map = new Map<number, DepartmentTreeNode>()
  const tree: DepartmentTreeNode[] = []
  for (const dept of departments) {
    map.set(dept.id, { ...dept, children: [] })
  }
  for (const dept of departments) {
    const node = map.get(dept.id)
    if (!node) continue
    if (dept.parentId === 0) tree.push(node)
    else map.get(dept.parentId)?.children.push(node)
  }
  return tree
}
