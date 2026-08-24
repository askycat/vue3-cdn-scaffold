(function () {
  const { loadModule } = window['vue3-sfc-loader']
  const styleCache = new Set()
  const siteInfo = window.SITE_CONFIG || {}
  const debug = siteInfo.debug === true
  const assetVersion = siteInfo.assetVersion || ''
  const assetCacheMode = debug ? 'no-store' : 'force-cache'

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

  // 版本变化时生成新的资源 URL；同一版本优先直接使用浏览器缓存。
  function versionAssetUrl(url) {
    const value = String(url)
    if (debug || !assetVersion || /[?&]v=/.test(value)) return value

    return value + (value.includes('?') ? '&' : '?') + 'v=' + encodeURIComponent(assetVersion)
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
  if (openPxToRem){
    setRootFontSize()
    window.addEventListener('resize', setRootFontSize)
    window.addEventListener('orientationchange', setRootFontSize)
  }

  const options = {
    moduleCache: {
      vue: Vue,
      'vue-router': VueRouter,
      'pinia': Pinia,
      'vue-i18n': VueI18n
    },

    async getFile(url) {
      const res = await fetch(versionAssetUrl(url), { cache: assetCacheMode })
      if (!res.ok) {
        //console.error(`加载文件失败：${url}`); 
      }

      const source = await res.text()
      // vue3-sfc-loader 读取 .vue 文件时，在源码阶段完成 px -> rem。
      return /\.vue(?:[?#]|$)/.test(url) && openPxToRem ? pxToRem(source) : source
    },

    async handleModule(type, getContentData, path, options) {
      if (!/\.vue(?:[?#]|$)/.test(type)) {
        return path
      }
    },

    addStyle(styleText) {
      addStyleText(styleText)
    },

    log(type, ...args) {
      console.log('[vue3-sfc-loader]', type, ...args)
    }
  }

  //懒加载组件
  window.loadVue = function (path) {
    return Vue.defineAsyncComponent(function () {
      return loadModule(path, options)
    })
  }
  //直接请求加载文件
   window.loadVueModule = function (path) {
        return loadModule(path, options)
  }
  //懒加载路由页面
  window.loadRouteVue = function (path) {
    return function () {
      return loadModule(path, options)
    }
  }

  // 加载外部 CSS 文件，使用浏览器缓存，并在注入前转换 px -> rem。
  window.loadRemCss = async function (url) {
    const res = await fetch(versionAssetUrl(url), { cache: assetCacheMode })
    if (!res.ok) {
      throw new Error(`加载样式失败：${url}`)
    }

    const styleText = pxToRem(await res.text())
    addStyleText(styleText)
  }

  window.sfcOptions = options


  const isIos = /iP(hone|od|ad)/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

  function preventEvent(event) {
    if (event.cancelable) {
      event.preventDefault()
    }
  }

  if (isIos) {
    const zoomStyle = document.createElement('style')
    zoomStyle.textContent = 'html,body,#app{touch-action:manipulation;}input,textarea,select{font-size:16px;}'
    document.head.appendChild(zoomStyle)

    ;['gesturestart', 'gesturechange', 'gestureend'].forEach(function (eventName) {
      document.addEventListener(eventName, preventEvent, { passive: false, capture: true })
    })

    document.addEventListener('touchstart', function (event) {
      if (event.touches && event.touches.length > 1) {
        preventEvent(event)
      }
    }, { passive: false, capture: true })

    document.addEventListener('touchmove', function (event) {
      if (event.touches && event.touches.length > 1) {
        preventEvent(event)
      }
    }, { passive: false, capture: true })

    let lastTouchEnd = 0
    // 阻止 iOS Safari 双击触发页面缩放。
    document.addEventListener('touchend', function (event) {
      const now = Date.now()
      const target = event.target
      const isEditable = target && target.closest && target.closest('input, textarea, select, [contenteditable="true"]')

      if (!isEditable && now - lastTouchEnd < 350) {
        preventEvent(event)
      }

      lastTouchEnd = now
    }, { passive: false, capture: true })

    document.addEventListener('dblclick', preventEvent, { passive: false, capture: true })
  }


})()
