const { createRouter, createWebHashHistory } = VueRouter
import i18n from '../i18n/index.js'

// 路由定义数组 (一行一个配置项)
const routeDefinitions = [
  { path: '/home', component: 'Home', title: '首页' },
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
  routes
})

router.beforeEach(function (to, from, next) {
  const titleKey = to.meta.title
  let title = (window.SITE_INFO && window.SITE_INFO.title)
  if(titleKey)
    title = i18n.global.t(titleKey) + ' | ' + title
  document.title = title
  next()
})

export default router
