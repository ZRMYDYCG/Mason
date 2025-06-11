/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
 */
export enum ERROR_TYPES {
  NAME_OR_PASSWORD_IS_REQUIRED = '用户名或者密码不能为空',
  USER_ALREADY_EXISTS = '用户名已经存在',
  USER_NOT_EXISTS = '用户不存在',
  PASSWORD_IS_INCORRECT = '密码不正确',
  UNAUTHORIZATION = '无效的token',
  UNPERMISSION = '没有权限',
  MENU_NOT_EXISTS = '菜单不存在',
  MENU_ALREADY_EXISTS = '菜单已经存在',
  INITIAL_ADMIN_CANNOT_BE_DELETED = '初始管理员不能被删除',
  INITIAL_ADMIN_CANNOT_BE_MODIFIED = '初始管理员不能被修改',
  ROLE_ALREADY_EXISTS = '角色已经存在',
  ROLE_NOT_EXISTS = '角色不存在',
  INITIAL_ROLE_CANNOT_BE_DELETED = '初始角色不能被删除',
  INITIAL_ROLE_CANNOT_BE_MODIFIED = '初始角色不能被修改',
  ROLE_HAS_ASSOCIATED_USERS = '角色拥有关联用户',
  CANNOT_DELETE_SELF = '无法删除本身',
  DEPT_NOT_EXISTS = '部门不存在',
  DEPT_HAS_ASSOCIATED_USERS = '部门拥有关联用户',
}
