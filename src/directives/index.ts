import type { App } from 'vue'
import { setupRippleDirective } from './modules/ripple.ts' // v-ripple 水波纹 directive

export function setupGlobDirectives(app: App) {
  setupRippleDirective(app)
}
