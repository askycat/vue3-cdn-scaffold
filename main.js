// 核心模块
const { createApp } = Vue
const { createPinia } = Pinia

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate.default)

import router from './router/index.js'

// 载入模块
import { loadComponents } from "./components/index.js"
import { loadPulgins } from './plugins/index.js'
import { loadDirectives } from "./directives/index.js"

// 先完成全局样式、根组件和关键控件，再挂载页面，避免慢网下露出半成品界面。
const { remCssUrls = [], remCssVersion } = window.SITE_CONFIG || {}
const [App] = await Promise.all([
  window.loadVueModule('./App.vue'),
  ...remCssUrls.map(url => window.loadRemCss(remCssVersion ? url + '?v=' + remCssVersion : url))
])

// 载入唯一的根组件 App.vue
const app = createApp(App)

// 批量执行手动循环注册
loadComponents(app)
loadPulgins(app)
loadDirectives(app)

app.use(pinia)
//在此前可挂载动态路由

app.use(router)

app.mount('#app')

window.vueApp = app

// Vue 挂载完成后隐藏首屏预加载层。
window.hidePreloader = function () {
  const preloader = document.getElementById('app-preloader')
  if (!preloader || preloader.classList.contains('app-preloader--hidden')) return

  preloader.classList.add('app-preloader--hidden')
  window.setTimeout(() => {
    preloader.remove()
  }, 240)
}

function hidePreloaderWhenReady() {
  router.isReady().then(() => {
    if (document.readyState === 'complete') {
      window.hidePreloader()
    } else {
      window.addEventListener('load', () => {
        window.hidePreloader()
      }, { once: true })
    }
  }).catch(() => {
    window.hidePreloader()
  })
}

hidePreloaderWhenReady()

