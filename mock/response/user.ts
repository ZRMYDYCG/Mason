import type { IMenubarList } from '../../src/config/interface'
import { user, user_role, role_route, route } from '../data/user'

export const login = (username: string, password: string) => {
  return (
    user.findIndex(
      item => item.name === username && item.password === password
    ) !== -1
  )
}

export const getUser = (
  username: string
): { username: string; role: Array<string> } => {
  return {
    username,
    role: user_role
      .filter(item => item.userName === username)
      .map(item => item.roleName),
  }
}

export const getRoute = (username: string): IMenubarList[] => {
  const { role } = getUser(username)
  const arr = role_route.filter(
    item => role.findIndex(i => i === item.roleName) !== -1
  )
  const filterRoute: Array<IMenubarList> = []
  route.forEach(item => {
    arr.forEach(val => {
      if (val.id === item.id) {
        const obj = Object.assign({}, item)
        obj.meta.permission = val.permission
        filterRoute.push(obj)
      }
    })
  })
  return filterRoute
}
