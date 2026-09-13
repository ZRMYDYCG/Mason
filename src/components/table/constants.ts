/** 操作列按钮 key，需与 columns.operateList 一起使用 */
export const TABLE_COLUMN_OPERATE = {
  DETAIL: Symbol('detail'),
  EDIT: Symbol('edit'),
  DELETE: Symbol('delete')
} as const
