import { user, user_role, role_route, route } from '../data/user'

export const login = (username: string, password: string) => {
    return user.findIndex(item => item.name === username && item.password === password) !== -1
}