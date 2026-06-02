(function () {
  const { loadModule } = window['vue3-sfc-loader']
  const styleCache = new Set()
  const siteInfo = window.SITE_CONFIG || {}

  // rem 换算基准：375px 设计稿下 16px = 1rem，并限制根字号范围。
  const openPxToRem = siteInfo.openPxToRem || false
  const pxToRemBase = siteInfo.pxToRemBase || 16
  const designWidth = siteInfo.designWidth || 375
  const minRootFontSize = siteInfo.minRootFontSize || 14
  const maxRootFontSize = siteInfo.maxRootFontSize || 36

  // 根据当前视口宽度动态设置 html 根字号。
  function setRootFontSize() {
    const width = document.documentElement.clientWidth || window.innerWidth || designWidth
    const fontSize = Math.min(maxRootFontSize, Math.max(minRootFontSize, (width / designWidth) * pxToRemBase))

    document.documentElement.style.fontSize = trimNumber(fontSize) + 'px'
  }

  function trimNumber(value) {
    return Number(value.toFixed(6)).toString()
  }

  // 将源码或 CSS 文本里的 px 统一转换为 rem。
  function pxToRem(styleText) {
    if (!openPxToRem) return styleText
    return styleText.replace(/(-?\d*\.?\d+)px\b/g, function (match, value) {
      return trimNumber(Number(value) / pxToRemBase) + 'rem'
    })
  }

  // 注入样式前做文本去重，避免重复插入相同 style。
  function addStyleText(styleText) {
    if (styleCache.has(styleText)) return

    styleCache.add(styleText)

    const style = document.createElement('style')
    style.textContent = styleText
    document.head.appendChild(style)
  }

  setRootFontSize()
  window.addEventListener('resize', setRootFontSize)
  window.addEventListener('orientationchange', setRootFontSize)

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

      const source = await res.text()
      // vue3-sfc-loader 读取 .vue 文件时，在源码阶段完成 px -> rem。
      return /\.vue(?:[?#]|$)/.test(url) && openPxToRem ? pxToRem(source) : source
    },

    addStyle(styleText) {
      addStyleText(styleText)
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

  // 加载外部 CSS 文件，使用浏览器缓存，并在注入前转换 px -> rem。
  window.loadRemCss = async function (url) {
    fetch(url, {
      cache: 'force-cache'
    }).then(async function (res) {
      if (!res.ok) {
        throw new Error(`加载样式失败：${url}`)
      }
      var styleText = await res.text()
      styleText = pxToRem(styleText)
      addStyleText(styleText)
    })
  }

  window.sfcOptions = options


  const isIosSafari = /iP(hone|od|ad)/.test(navigator.platform) && /^((?!crios|fxios|edgios|chrome|android).)*safari/i.test(navigator.userAgent)

  if (isIosSafari) {
    // 阻止 iOS Safari 双指手势触发页面缩放。
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault()
    }, { passive: false })

    let lastTouchEnd = 0
    // 阻止 iOS Safari 双击触发页面缩放。
    document.addEventListener('touchend', function (event) {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }, { passive: false })
  }


})()
