import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/reset.scss'
import '@/styles/common.scss'
import '@/styles/iconfont.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/element-dark.scss'
import './tailwind.css'

import ElementPlus from 'element-plus'
import PrintLogo from './print-logo.ts'
import router from '@/router'
import pinia from '@/store'

async function bootstrap() {
  const app = createApp(App)
  app.use(router)
  app.use(ElementPlus)
  app.use(pinia)

  PrintLogo()

  app.mount('#app')
}

bootstrap()
