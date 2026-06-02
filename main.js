// 核心模块
const { createApp } = Vue
const { createPinia } = Pinia

// 载入PX TO REM样式表
const { remCssUrls = [], remCssVersion } = window.SITE_CONFIG || {}
remCssUrls.forEach(url => {
  window.loadRemCss(remCssVersion ? url + '?v=' + remCssVersion : url)
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate.default)

import router from './router/index.js'

// 载入模块
import { loadComponents } from "./components/index.js"
import { loadPulgins } from './plugins/index.js'
import { loadDirectives } from "./directives/index.js"

// 载入唯一的根组件 App.vue
const App = loadVue('./App.vue')
const app = createApp(App)

// 批量执行手动循环注册
loadComponents(app)
loadPulgins(app)
loadDirectives(app)

app.use(pinia)
app.use(router)

app.mount('#app')

window.vueApp = app

