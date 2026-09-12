export const PERMISSION_CODES = {
  AUTH_TEST: 'auth:test',
  USER_LIST: 'user:list',
  USER_ADD: 'user:add',
  USER_UPDATE_PROFILE: 'user:update-profile',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_INFO: 'user:info',
  ROLE_LIST: 'role:list',
  ROLE_LIST_ALL: 'role:listAll',
  ROLE_ADD: 'role:add',
  ROLE_UPDATE: 'role:update',
  ROLE_DELETE: 'role:delete',
  ROLE_USE_MENUS: 'role:useMenus',
  MENU_LIST: 'menu:list',
  MENU_LIST_ALL: 'menu:listAll',
  MENU_ADD: 'menu:add',
  MENU_UPDATE: 'menu:update',
  MENU_DELETE: 'menu:delete',
  DEPARTMENT_LIST_ALL: 'department:listAll',
  DEPARTMENT_ADD: 'department:add',
  DEPARTMENT_UPDATE: 'department:update',
  DEPARTMENT_DELETE: 'department:delete',
  LOG_LIST: 'log:list',
  LOG_DELETE: 'log:delete',
  UPLOAD_SINGLE: 'upload:single'
} as const

export const splitPermission = (code: string) => {
  const [resource, action] = code.split(':')
  return { resource, action }
}
