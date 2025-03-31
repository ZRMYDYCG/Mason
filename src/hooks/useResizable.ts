import { ref, toRef, watchEffect } from 'vue'

interface ResizableOptions {
  minWidth: number
  maxWidth: number
  initialWidth?: number
}

export default function useResizable(options: ResizableOptions) {
  const minWidth = toRef(options, 'minWidth')
  const maxWidth = toRef(options, 'maxWidth')
  const initialWidth = toRef(options, 'initialWidth')

  const width = ref(initialWidth.value ?? minWidth.value)
  const isDragging = ref(false)
  const originalUserSelect = ref('')

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return
    width.value = Math.min(maxWidth.value, Math.max(minWidth.value, e.clientX))
  }

  const handleMouseUp = () => {
    isDragging.value = false
  }

  const handleMouseDown = () => {
    isDragging.value = true
    originalUserSelect.value = document.body.style.userSelect
    document.body.style.userSelect = 'none'
  }

  watchEffect((onCleanup) => {
    if (isDragging.value) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      onCleanup(() => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.userSelect = originalUserSelect.value
      })
    }
  })

  return {
    width,
    handleMouseDown,
    isDragging
  }
}
