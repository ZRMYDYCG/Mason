/*
 * @description: 当前组件实例hooks，用以提供常用工具等
 */
import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface CustomProperties {
  $api: any
  $HTTP_CODE: any
  $common: any
}

export const useCurrentInstance = () => {
  const router = useRouter()
  const route = useRoute()

  const currentInstance = getCurrentInstance()

  if (!currentInstance) {
    throw new Error('useCurrentInstance must be called within a setup function')
  }

  const { proxy } = currentInstance as ComponentInternalInstance & {
    proxy: ComponentPublicInstance & CustomProperties
  }

  const { $api, $HTTP_CODE, $common } = proxy

  return {
    router,
    route,
    currentInstance,
    proxy,
    $api,
    $HTTP_CODE,
    $common
  }
}
