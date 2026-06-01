const { createI18n } = VueI18n

const lang = localStorage.getItem('lang') || 'zh-CN'

// 1. 同步创建一个初始的 i18n 实例
const i18n = createI18n({
  legacy: false, // 启用组合式 API 支持
  locale: lang,
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': {},
    'en-US': {}
  }
})

// 2. 利用原生 ES 模块的 Top-level await，在模块加载阶段异步获取并填充 JSON 语言包数据
try {
  const [zhRes, enRes] = await Promise.all([
    fetch('./i18n/zh-CN.json').then(r => r.json()),
    fetch('./i18n/en-US.json').then(r => r.json())
  ])

  i18n.global.setLocaleMessage('zh-CN', zhRes)
  i18n.global.setLocaleMessage('en-US', enRes)
} catch (error) {
  console.error('加载 JSON 语言包失败:', error)
}

export default i18n
