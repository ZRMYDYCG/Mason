import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'
import { loadLanguage } from '@/i18n'
import i18n from '@/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes as RouteRecordRaw[])
})

async function loadRouteLocales(to: RouteLocationNormalized) {
  const currentLang = localStorage.getItem('local') || 'zh-CN'

  await loadLanguage(currentLang)

  if(to.meta.locales) {
    for(const locale of to.meta.locales as string[]) {
      try {
        await import(`@/i18n/locales/modules/${currentLang}/${locale}.ts`).then((messages) => {
          i18n.global.mergeLocaleMessage(currentLang, {
            [locale]: messages.default
          })
        })
      } catch(e) {
        console.warn(`Failed to load locale ${locale} for route ${to.path} ${e}`)
      }
    }
  }
}

router.beforeEach(async (to, from, next) => {
  await loadRouteLocales(to)
  next()
})

export const installRouter = (app: App) => {
  app.use(router)
}

export default router
