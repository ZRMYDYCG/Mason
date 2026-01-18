import type { App, Directive, DirectiveBinding } from 'vue'

const longpress: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const delay = binding.arg ? parseInt(binding.arg) : 1000
    const cb = binding.value

    let pressTimer: any = null

    const start = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent && e.button !== 0) return

      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          cb(e)
        }, delay)
      }
    }

    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    // Mobile
    el.addEventListener('touchstart', start)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)

    // Desktop
    el.addEventListener('mousedown', start)
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
  },
  beforeUnmount(el: HTMLElement) {
    // Note: We are not storing the handlers on el to remove them, which is a leak.
    // Ideally we should store them.
    // For simplicity I will just clone the node to remove listeners or implement properly.
    // Let's implement properly.
  }
}

// Re-implementing with proper cleanup
interface LongPressElement extends HTMLElement {
  _start: (e: MouseEvent | TouchEvent) => void
  _cancel: () => void
}

const longpressDirective: Directive = {
  mounted(el: LongPressElement, binding: DirectiveBinding) {
    const delay = binding.arg ? parseInt(binding.arg) : 1000
    const cb = binding.value

    let pressTimer: any = null

    el._start = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent && e.button !== 0) return

      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          cb(e)
        }, delay)
      }
    }

    el._cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    // Mobile
    el.addEventListener('touchstart', el._start)
    el.addEventListener('touchend', el._cancel)
    el.addEventListener('touchcancel', el._cancel)

    // Desktop
    el.addEventListener('mousedown', el._start)
    el.addEventListener('click', el._cancel)
    el.addEventListener('mouseout', el._cancel)
  },
  beforeUnmount(el: LongPressElement) {
    el.removeEventListener('touchstart', el._start)
    el.removeEventListener('touchend', el._cancel)
    el.removeEventListener('touchcancel', el._cancel)
    el.removeEventListener('mousedown', el._start)
    el.removeEventListener('click', el._cancel)
    el.removeEventListener('mouseout', el._cancel)
  }
}

export function setupLongpressDirective(app: App) {
  app.directive('longpress', longpressDirective)
}
