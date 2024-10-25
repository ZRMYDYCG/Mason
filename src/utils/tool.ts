/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
 */
import { IMenubarList } from '@/config/interface'
/**
 * list结构转tree
 * @param data list原始数据
 * @param pid 最外层pid
 */
export function listToTree(
  data: Array<IMenubarList>,
  pid: string | number = 1,
  isChildNull = false
): Array<IMenubarList> {
  const result: Array<IMenubarList> = []
  data.forEach(val => {
    if (val.parentId == pid) {
      const list = listToTree(data, val.id, isChildNull)
      const obj: IMenubarList = { ...val }
      if (!isChildNull || list.length !== 0) {
        obj.children = list
      }
      result.push(obj)
    }
  })
  return result
}
