/** 加载组件 */
export function loadComponents(app) {
  const components = [
    { name: 'AppHeader', path: './components/AppHeader.vue' },
    { name: 'MobileLayout', path: './components/MobileLayout.vue' },
    { name: 'MobileNavBar', path: './components/MobileNavBar.vue' },
    { name: 'MobileTabBar', path: './components/MobileTabBar.vue' },
    { name: 'MobileCard', path: './components/MobileCard.vue' }
  ]

  components.forEach(item => {
    app.component(item.name, loadVue(item.path))
  })
}