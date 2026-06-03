/** 加载组件 */
export function loadComponents(app) {
  const components = [
    { name: 'AppHeader', path: './components/AppHeader.vue' },
  ]

  components.forEach(item => {
    app.component(item.name, loadVue(item.path))
  })
}