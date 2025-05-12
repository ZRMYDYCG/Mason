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
import '@/styles/theme-animation.scss'
import './tailwind.css'
import { setupGlobDirectives } from '@/directives'
import { mockXHR } from '@/mock/index.ts'
import { registerEcharts } from '@/plugins/echarts.ts'

import ElementPlus from 'element-plus'
import PrintLogo from './print-logo.ts'
import router from '@/router'
import pinia from '@/store'
// vue i18n
import I18n from '@/language'

// mock 开关
mockXHR(true)

async function bootstrap() {
  const app = createApp(App)
  app.use(router)
  app.use(ElementPlus)
  app.use(pinia)
  app.use(I18n)

  // 注册全局指令
  setupGlobDirectives(app)
  // vue-echarts 按需注册
  registerEcharts(app)

  PrintLogo()

  app.mount('#app')
}

bootstrap()
