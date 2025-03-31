import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/reset.scss'
import '@/styles/common.scss'
import '@/styles/iconfont.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-message-box.css'
import '@/styles/element-dark.scss'
import './tailwind.css'
import { setupGlobDirectives } from '@/directives'

import ElementPlus from 'element-plus'
import PrintLogo from './print-logo.ts'
import router from '@/router'
import pinia from '@/store'

async function bootstrap() {
  const app = createApp(App)
  app.use(router)
  app.use(ElementPlus)
  app.use(pinia)

  // 注册全局指令
  setupGlobDirectives(app)

  PrintLogo()

  app.mount('#app')
}

bootstrap()
