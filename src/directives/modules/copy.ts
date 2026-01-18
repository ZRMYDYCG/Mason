import type { App, Directive, DirectiveBinding } from 'vue'
import { ElMessage } from 'element-plus'

interface CopyElement extends HTMLElement {
  copyValue: string
  handler: () => void
}

const copy: Directive = {
  mounted(el: CopyElement, binding: DirectiveBinding) {
    el.copyValue = binding.value
    el.handler = () => {
      if (!el.copyValue) {
        ElMessage.warning('无复制内容')
        return
      }
      navigator.clipboard
        .writeText(el.copyValue)
        .then(() => {
          ElMessage.success('复制成功')
        })
        .catch(() => {
          ElMessage.error('复制失败')
        })
    }
    el.addEventListener('click', el.handler)
  },
  updated(el: CopyElement, binding: DirectiveBinding) {
    el.copyValue = binding.value
  },
  beforeUnmount(el: CopyElement) {
    el.removeEventListener('click', el.handler)
  }
}

export function setupCopyDirective(app: App) {
  app.directive('copy', copy)
}
