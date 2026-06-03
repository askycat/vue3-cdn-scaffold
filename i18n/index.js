const { createI18n } = VueI18n
const { watch } = Vue

const STORAGE_KEY = 'lang'
const DEFAULT_LOCALE = 'zh-CN'
const FALLBACK_LOCALE = 'zh-CN'
const lang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LOCALE

const res = await fetch('./i18n/lang.20260603165656.json', {cache: 'force-cache'})
const i18nResource = await res.json()


// 1. 同步创建一个初始的 i18n 实例
const i18n = createI18n({
  legacy: false, // Vue 3 Composition API 
  locale: lang,
  fallbackLocale: FALLBACK_LOCALE,
  messages: i18nResource.messages || {}
})

watch(
  i18n.global.locale,
  value => {
    localStorage.setItem(STORAGE_KEY, value)
  }
)

export default i18n
