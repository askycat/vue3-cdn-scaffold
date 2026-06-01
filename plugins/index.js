import http from './http.js'
import i18n from './i18n.js'

const plugins = [http, i18n]

/** 加载插件 */
export function loadPulgins(app) {
  plugins.forEach(plugin => {
    if (typeof plugin === 'function') {
      plugin(app)
    }
  })
}