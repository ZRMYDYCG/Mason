export const toNumber = (value: bigint | number | null | undefined) =>
  typeof value === 'bigint' ? Number(value) : value

export const serializeBigInt = <T>(value: T): T =>
  JSON.parse(
    JSON.stringify(value, (_key, inner) => (typeof inner === 'bigint' ? Number(inner) : inner))
  )

export const formatMenus = (menus: any[]) => {
  const menuList = menus.map((menu) => ({
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
  const map = new Map<number, any>()
  const roots: any[] = []
  for (const item of menuList) map.set(item.id, item)
  for (const item of menuList) {
    const parent = map.get(item.parentId)
    if (item.parentId !== 0 && parent) parent.children.push(item)
    else roots.push(item)
  }
  return roots
}

export const buildTreeDepartment = (departments: any[]) => {
  const map = new Map<number, any>()
  const tree: any[] = []
  for (const dept of departments) {
    map.set(dept.id, { ...dept, children: [] })
  }
  for (const dept of departments) {
    const node = map.get(dept.id)
    if (dept.parentId === 0) tree.push(node)
    else map.get(dept.parentId)?.children.push(node)
  }
  return tree
}
