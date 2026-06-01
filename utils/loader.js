(function () {
  const { loadModule } = window['vue3-sfc-loader']
  const styleCache = new Set()

  const options = {
    moduleCache: {
      vue: Vue,
      'vue-router': VueRouter,
      'pinia': Pinia,
      'vue-i18n': VueI18n
    },

    async getFile(url) {
      const res = await fetch(url)

      if (!res.ok) {
        throw new Error(`加载文件失败：${url}`)
      }

      return await res.text()
    },

    addStyle(styleText) {
      if (styleCache.has(styleText)) return

      styleCache.add(styleText)

      const style = document.createElement('style')
      style.textContent = styleText
      document.head.appendChild(style)
    },

    log(type, ...args) {
      console.log('[vue3-sfc-loader]', type, ...args)
    }
  }

  window.loadVue = function (path) {
    return Vue.defineAsyncComponent(function () {
      return loadModule(path, options)
    })
  }

  window.loadRouteVue = function (path) {
    return function () {
      return loadModule(path, options)
    }
  }

  window.sfcOptions = options
})()
