const { createRouter, createWebHashHistory } = VueRouter
import i18n from '../i18n/index.js'

// 路由定义数组 (一行一个配置项)
const routeDefinitions = [
  { path: '/home', component: 'Home', title: '首页' },
  { path: '/showcase', component: 'Showcase', title: '参考页面' },
  { path: '/:pathMatch(.*)*', component: '404', title: '页面不存在' }
]

// 循环映射构建 Vue Router 路由规则
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  ...routeDefinitions.map(item => ({
    path: item.path,
    component: loadRouteVue(`./views/${item.component}.vue`),
    meta: {
      title: item.title
    }
  }))
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 1, left: 0 }
  }
})

router.beforeEach(function (to, from, next) {
  const titleKey = to.meta.title
  let title = (window.SITE_CONFIG && window.SITE_CONFIG.title)||''
  if(titleKey)
    title = i18n.global.t(titleKey) + ' | ' + title
  document.title = title
  next()
})

let dynamicRouteRemovers = []
function resetPermissionRoutes() {
    dynamicRouteRemovers.forEach(removeRoute => removeRoute())
    dynamicRouteRemovers = []
}
function registerPermissionRoutes(routes) {
    resetPermissionRoutes()

    for (const route of routes) {
        dynamicRouteRemovers.push(router.addRoute({
            ...route,
            meta: { ...route.meta, auth: route.meta?.auth ?? true },
            component: loadRouteVue(`./views/${route.component}`)
        }))
    }
}
window.registerPermissionRoutes = registerPermissionRoutes
window.resetPermissionRoutes = resetPermissionRoutes

export default router
