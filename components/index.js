/** 加载组件 */
export function loadComponents(app) {
  const components = [
    { name: 'AppHeader', path: './components/AppHeader.vue' },
    { name: 'SideMenu', path: './components/SideMenu.vue' }
  ]

  components.forEach(item => {
    app.component(item.name, loadVue(item.path))
  })
}