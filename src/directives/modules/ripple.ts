import type { App, Directive, DirectiveBinding } from 'vue'

type RippleEvent = MouseEvent | TouchEvent

interface RippleOptions {
  event?: 'mousedown' | 'click' | 'touchstart'
  transition?: number
  background?: string
  zIndex?: string
  disabled?: boolean
}

interface RippleElement extends HTMLElement {
  _rippleHandler?: (e: RippleEvent) => void
  _rippleOptions?: RippleOptions
}

const DEFAULT_OPTIONS: RippleOptions = {
  event: 'mousedown',
  transition: 400,
  background: 'rgba(0, 0, 0, 0.12)',
  zIndex: '9999',
  disabled: false
}

const createRippleElement = (options: RippleOptions): HTMLDivElement => {
  const ripple = document.createElement('div')
  Object.assign(ripple.style, {
    position: 'absolute',
    borderRadius: '50%',
    transform: 'scale(0)',
    pointerEvents: 'none',
    backgroundColor: options.background,
    zIndex: options.zIndex,
    transition: `transform ${options.transition}ms cubic-bezier(0.4, 0, 0.2, 1),
                opacity ${options.transition}ms linear`,
    opacity: '0.3'
  })
  ripple.className = 'vue-ripple-effect'
  return ripple
}

const getRippleSize = (el: HTMLElement, event: RippleEvent) => {
  const rect = el.getBoundingClientRect()
  const isTouch = event instanceof TouchEvent
  const clientX = isTouch ? event.touches[0].clientX : event.clientX
  const clientY = isTouch ? event.touches[0].clientY : event.clientY

  const dx = clientX - rect.left
  const dy = clientY - rect.top
  const maxX = Math.max(dx, rect.width - dx)
  const maxY = Math.max(dy, rect.height - dy)

  return {
    radius: Math.sqrt(maxX ** 2 + maxY ** 2),
    centerX: dx,
    centerY: dy
  }
}

const runRippleEffect = (el: RippleElement, event: RippleEvent, options: RippleOptions) => {
  if (options.disabled) return

  // Ensure the element has proper styling for ripple containment
  if (!el.style.position || el.style.position === 'static') {
    el.style.position = 'relative'
  }
  el.style.overflow = 'hidden'

  const { radius, centerX, centerY } = getRippleSize(el, event)
  const container = document.createElement('div')
  container.className = 'vue-ripple-container'

  // Get computed border radius to match the parent element
  const computedStyle = window.getComputedStyle(el)
  const borderRadius = computedStyle.borderRadius || '0'

  Object.assign(container.style, {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: borderRadius,
    pointerEvents: 'none'
  })

  const ripple = createRippleElement(options)
  container.appendChild(ripple)

  Object.assign(ripple.style, {
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    left: `${centerX - radius}px`,
    top: `${centerY - radius}px`
  })

  requestAnimationFrame(() => {
    ripple.style.transform = 'scale(1)'
  })

  const cleanup = () => {
    ripple.style.opacity = '0'
    setTimeout(() => {
      container.remove()
    }, options.transition)

    el.removeEventListener('mouseup', cleanup)
    el.removeEventListener('mouseleave', cleanup)
    el.removeEventListener('touchend', cleanup)
  }

  el.addEventListener('mouseup', cleanup)
  el.addEventListener('mouseleave', cleanup)
  el.addEventListener('touchend', cleanup)

  el.appendChild(container)
}

const RippleDirective: Directive = {
  mounted(el: RippleElement, binding: DirectiveBinding<RippleOptions | boolean>) {
    const options =
      typeof binding.value === 'boolean'
        ? { ...DEFAULT_OPTIONS, disabled: !binding.value }
        : { ...DEFAULT_OPTIONS, ...binding.value }

    el._rippleOptions = options

    const handler = (event: RippleEvent) => {
      if (binding.modifiers.stop) event.stopPropagation()
      runRippleEffect(el, event, options)
    }

    el._rippleHandler = handler
    el.addEventListener(options.event!, handler)

    // Apply necessary styles for ripple containment
    if (!el.style.position || el.style.position === 'static') {
      el.style.position = 'relative'
    }
    el.style.overflow = 'hidden'
  },

  updated(el: RippleElement, binding: DirectiveBinding<RippleOptions | boolean>) {
    const options =
      typeof binding.value === 'boolean'
        ? { ...DEFAULT_OPTIONS, disabled: !binding.value }
        : { ...DEFAULT_OPTIONS, ...binding.value }

    el._rippleOptions = options
  },

  beforeUnmount(el: RippleElement) {
    if (el._rippleHandler && el._rippleOptions?.event) {
      el.removeEventListener(el._rippleOptions.event, el._rippleHandler)
      delete el._rippleHandler
      delete el._rippleOptions
    }
  }
}

export function installRipple(app: App) {
  app.directive('ripple', RippleDirective)
}

const rippleStyles = `
.vue-ripple-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  border-radius: inherit;
}

.vue-ripple-effect {
  position: absolute;
  transform: scale(0);
  opacity: 0.3;
  background-color: var(--ripple-color, rgba(0, 0, 0, 0.12));
  transition:
    transform 400ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 400ms linear;
  z-index: 9999;
  pointer-events: none;
  border-radius: 50%;
}
`

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.innerHTML = rippleStyles
  document.head.appendChild(style)
}

export function setupRippleDirective(app: App) {
  app.directive('ripple', RippleDirective)
}

export default RippleDirective
