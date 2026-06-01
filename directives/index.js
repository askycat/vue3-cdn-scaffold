import permission from "./permission.js"

const directives = [
  { name: 'permission', definition: permission }
]

/** 挂载自定义指令 */
export function loadDirectives(app) {
  directives.forEach(item => {
    app.directive(item.name, item.definition)
  })
}