/**
 * @description 动态路由名称映射表
 * */
interface IObject<T> {
  [index: string]: T
}
import type { IMenubarList } from '@/config/interface'
import { listToTree } from '@/utils/tool'

const modules = import.meta.glob('../../views/**/*.vue')
const components: IObject<() => Promise<typeof import('*.vue')>> = {
  Layout: () => import('@/Layout/index.vue'),
}

Object.keys(modules).forEach(key => {
  const nameMatch = key.match(/^\.\.\/views\/(.+)\.vue/)
  if (!nameMatch) return
  // 如果页面以Index命名，则使用父文件夹作为name
  const indexMatch = nameMatch[1].match(/(.*)\/Index$/i)
  let name = indexMatch ? indexMatch[1] : nameMatch[1]
  ;[name] = name.split('/').splice(-1)
  components[name] = modules[key] as () => Promise<typeof import('*.vue')>
})

const asyncRouter: IMenubarList[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: components['404'],
    meta: {
      title: 'NotFound',
      icon: '',
      hidden: true,
    },
    redirect: {
      name: '404',
    },
  },
]

export const generatorDynamicRouter = (data: IMenubarList[]): void => {
  const routerList: IMenubarList[] = listToTree(data, 0)
}
