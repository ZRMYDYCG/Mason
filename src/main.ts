import { createApp } from 'vue'

import App from './App.vue'
import { installRouter } from '@/router'
import { installPinia } from './stores'
import { installAssets } from './plugins/assets'
import { installI18n } from './i18n'

const app = createApp(App)

installAssets()
installRouter(app)
installPinia(app)
installI18n(app)

app.mount('#app')
