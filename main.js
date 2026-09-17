// 核心模块
const { createApp } = Vue
const { createPinia } = Pinia

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate.default)

import router from './router/index.js'

// 载入模块
import { loadComponents } from './components/index.js'
import { loadPlugins } from './plugins/index.js'
import { loadDirectives } from './directives/index.js'

// 先完成全局样式、根组件和登录页关键控件，再挂载页面，避免慢网下露出半成品界面。
const { cssUrls = [] } = window.SITE_CONFIG || {}
const [App] = await Promise.all([
  window.loadVueModule('./App.vue'),
  ...cssUrls.map(window.loadRemCss)
])

// 载入唯一的根组件 App.vue
const app = createApp(App)

// 批量执行手动循环注册
loadComponents(app)
loadPlugins(app)
loadDirectives(app)

app.use(pinia)
//在此前可挂载动态路由 全局信息
// await window.useAppStore().load().catch(error => {
//     console.error('应用信息加载失败', error)
// })

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

// 确保在页面所有静态资源（图片、字体、脚本）以及 Vue 路由组件完全加载完毕后再平滑解散预加载界面
function checkAllResourcesLoaded() {
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

checkAllResourcesLoaded()
