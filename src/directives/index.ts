import type { App } from 'vue'
import { setupRippleDirective } from './modules/ripple.ts'
import { setupCopyDirective } from './modules/copy.ts'
import { setupDebounceDirective } from './modules/debounce.ts'
import { setupThrottleDirective } from './modules/throttle.ts'
import { setupLongpressDirective } from './modules/longpress.ts'

export function setupGlobDirectives(app: App) {
  setupRippleDirective(app)
  setupCopyDirective(app)
  setupDebounceDirective(app)
  setupThrottleDirective(app)
  setupLongpressDirective(app)
}
