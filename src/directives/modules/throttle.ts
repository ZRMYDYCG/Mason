import type { App, Directive, DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  __handleClick__: (e: Event) => void
}

const throttle: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    let timer: any = null
    const delay = binding.arg ? parseInt(binding.arg) : 1000

    el.__handleClick__ = function (this: any, e: Event) {
      if (!timer) {
        binding.value(e)
        timer = setTimeout(() => {
          timer = null
        }, delay)
      }
    }
    el.addEventListener('click', el.__handleClick__)
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleClick__)
  }
}

export function setupThrottleDirective(app: App) {
  app.directive('throttle', throttle)
}
