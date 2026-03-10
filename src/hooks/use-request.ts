import type { AxiosRequestConfig } from 'axios'
import { ref, shallowRef, watch } from 'vue'
import type { Ref, WatchSource } from 'vue'

export interface UseRequestOptions<T> {
  // 是否在组件挂载时自动请求
  auto?: boolean
  // 依赖项，变化时重新请求
  deps?: WatchSource<unknown>[]
  // 初始数据
  initialData?: T
  // 请求前的回调
  onBefore?: () => void
  // 请求成功的回调
  onSuccess?: (data: T) => void
  // 请求失败的回调
  onError?: (error: unknown) => void
  // 请求完成的回调（无论成功还是失败）
  onFinally?: () => void
}

export interface UseRequestReturn<T> {
  // 请求数据
  data: Ref<T | undefined>
  // 加载状态
  loading: Ref<boolean>
  // 错误信息
  error: Ref<unknown | null>
  // 手动触发请求
  run: (config?: AxiosRequestConfig) => Promise<T>
}

export function useRequest<T>(
  requestFn: (config?: AxiosRequestConfig) => Promise<T>,
  options: UseRequestOptions<T> = {},
): UseRequestReturn<T> {
  const {
    auto = true,
    deps = [],
    initialData,
    onBefore,
    onSuccess,
    onError,
    onFinally,
  } = options

  const data = shallowRef<T | undefined>(initialData)
  const loading = ref(false)
  const error = ref<unknown | null>(null)

  // 执行请求
  const executeRequest = async (config?: AxiosRequestConfig): Promise<T> => {
    try {
      onBefore?.()
      loading.value = true
      error.value = null

      // 执行请求函数
      const result = await requestFn(config)
      data.value = result
      onSuccess?.(result)
      return result
    } catch (err) {
      error.value = err
      onError?.(err)
      throw err
    } finally {
      loading.value = false
      onFinally?.()
    }
  }

  // 手动触发请求
  const run = (config?: AxiosRequestConfig): Promise<T> => executeRequest(config)

  // 自动请求
  if (auto) executeRequest()

  // 依赖追踪
  if (deps.length > 0) {
    watch(
      deps,
      () => {
        executeRequest()
      },
      { deep: true },
    )
  }

  return {
    data,
    loading,
    error,
    run,
  }
}