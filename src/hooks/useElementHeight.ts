import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 获取元素高度的 Hook
 * @param elementRef - 元素的 ref
 * @returns 返回一个响应式的高度值
 */
export function useElementHeight(elementRef: any) {
  const height = ref(0)

  function handleResize() {
    if (elementRef.value) {
      height.value = elementRef.value.offsetHeight
    }
  }

  onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    height
  }
}
