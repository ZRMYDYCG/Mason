import { createApp } from 'vue'

import App from './App.vue'

// reset style sheet
import '@/styles/reset.scss'
// CSS common style sheet
import '@/styles/common.scss'
// CSS variable style sheet
import '@/styles/var.scss'
// iconfont
import '@/styles/iconfont.scss'
// el-message el-message-box css
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'
// el-tree css
import 'element-plus/es/components/tree/style/css'
// element dark css
import 'element-plus/theme-chalk/dark/css-vars.css'
// custom element dark css
import '@/styles/element-dark.scss'
// tailwindcss
import './tailwind.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from '@/router'

import pinia from '@/store'

const app = createApp(App)

app.use(router).use(pinia).use(ElementPlus).mount('#app')
