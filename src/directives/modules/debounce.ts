import type { App, Directive, DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  __handleClick__: (e: Event) => void
}

const debounce: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    let timer: any = null
    const delay = binding.arg ? parseInt(binding.arg) : 500
    
    el.__handleClick__ = function (this: any, e: Event) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        binding.value(e)
      }, delay)
    }
    el.addEventListener('click', el.__handleClick__)
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleClick__)
  }
}

export function setupDebounceDirective(app: App) {
  app.directive('debounce', debounce)
}
