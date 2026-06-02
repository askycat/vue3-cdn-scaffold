<template>
  <div class="doc-container">
    <!-- 头部横幅 -->
    <header class="doc-hero">
      <div class="hero-badge">开发指南 & 模块文档</div>
      <h1 class="hero-title">{{ siteInfo.title }}</h1>
      <p class="hero-subtitle">
        {{ siteInfo.description }}
      </p>
    </header>

    <nav class="sticky-nav-bar">
      <div class="quick-nav">
        <a href="#" @click.prevent="scrollToSection('section-loader')" class="nav-btn">🚀 动态加载</a>
        <a href="#" @click.prevent="scrollToSection('section-store')" class="nav-btn">📊 状态管理</a>
        <a href="#" @click.prevent="scrollToSection('section-http')" class="nav-btn">🌐 接口请求</a>
        <a href="#" @click.prevent="scrollToSection('section-directive')" class="nav-btn">🔒 权限指令</a>
        <a href="#" @click.prevent="scrollToSection('section-i18n')" class="nav-btn">💬 国际化</a>
        <a href="#" @click.prevent="scrollToSection('section-config')" class="nav-btn">⚙️ 站点配置</a>
        <router-link to="/mobile-demo" class="nav-btn">📱 示例页面</router-link>
      </div>
    </nav>

    <!-- 文档主体内容 -->
    <main class="doc-content">

      <!-- 模块 1: 动态组件与路由加载 -->
      <section id="section-loader" class="doc-section">
        <h2 class="section-title"><span class="number">01.</span> 动态加载器 (vue3-sfc-loader)</h2>
        <p class="section-desc">
          本项目使用 <code>vue3-sfc-loader</code> 在浏览器端直接解析和加载 <code>.vue</code> 单文件组件，无需经过 Node.js 构建流程。
        </p>
        <div class="code-block-wrapper" v-pre>
          <div class="code-header">
            <span class="code-lang">JavaScript</span>
            <span class="code-path">utils/loader.js</span>
          </div>
          <pre><code>// 1. 全局挂载普通异步组件加载方法
window.loadVue = function (path) {
  return Vue.defineAsyncComponent(function () {
    return loadModule(path, options)
  })
}

// 2. 全局挂载路由视图加载方法
window.loadRouteVue = function (path) {
  return function () {
    return loadModule(path, options)
  }
}</code></pre>
        </div>
        <div class="usage-guide" v-pre>
          <h4>💡 使用示例：</h4>
          <p>在路由配置或组件注册中直接调用加载器：</p>
          <pre><code>// 注册普通组件
app.component('MyComponent', loadVue('./components/MyComponent.vue'))

// 配置路由组件
const routes = [
  { path: '/home', component: loadRouteVue('./views/Home.vue') }
]</code></pre>
        </div>
      </section>

      <!-- 模块 2: 全局状态管理 -->
      <section id="section-store" class="doc-section">
        <h2 class="section-title"><span class="number">02.</span> 响应式状态管理 (Pinia)</h2>
        <p class="section-desc">
          项目集成了 <code>Pinia</code> 作为全局状态管理，并通过 <code>piniaPluginPersistedstate</code> 插件实现了持久化存储。
        </p>
        <div class="code-block-wrapper" v-pre>
          <div class="code-header">
            <span class="code-lang">JavaScript</span>
            <span class="code-path">stores/counter.js</span>
          </div>
          <pre><code>// 挂载在 window 全局，确保 SFC 组件中无需显式 import 即可直接调用
window.useCounterStore = Pinia.defineStore('counter', {
  persist: true, // 启用自动 localStorage 持久化缓存
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})</code></pre>
        </div>
        <div class="usage-guide" v-pre>
          <h4>💡 使用示例：</h4>
          <p>在 SFC 组件的 <code>&lt;script setup&gt;</code> 中直接运行（无需引入）：</p>
          <pre><code>&lt;script setup&gt;
// 直接获取全局 Store 实例
const counterStore = useCounterStore()
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;当前计数：{{ counterStore.count }}&lt;/p&gt;
    &lt;p&gt;双倍计数：{{ counterStore.doubleCount }}&lt;/p&gt;
    &lt;button @click="counterStore.increment"&gt;递增&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
      </section>

      <!-- 模块 3: 统一接口请求 -->
      <section id="section-http" class="doc-section">
        <h2 class="section-title"><span class="number">03.</span> 统一接口请求 (Axios 封装)</h2>
        <p class="section-desc">
          项目中将 <code>axios</code> 进行了轻量封装，支持超时、基础地址配置、请求拦截器（自动追加 Authorization Token）以及响应拦截器（统一错误提示处理）。
        </p>
        <div class="code-block-wrapper" v-pre>
          <div class="code-header">
            <span class="code-lang">JavaScript</span>
            <span class="code-path">utils/axios.js</span>
          </div>
          <pre><code>// 提供常用的请求封装 API
export default {
  // GET 异步请求
  getAsync(url, params, errorCallBack) { ... },
  
  // POST 异步请求
  postAsync(url, params, errorCallBack) { ... },
  
  // 自动化二进制文件流下载（支持自动解析文件名）
  downloadAsync(url, params, filename, method) { ... }
}</code></pre>
        </div>
        <div class="usage-guide" v-pre>
          <h4>💡 使用示例：</h4>
          <p>在组件中通过注入 <code>http</code> 或全局变量 <code>window.http</code> 调用：</p>
          <pre><code>&lt;script setup&gt;
import { inject } from 'vue'
const http = inject('http')

const fetchData = async () => {
  try {
    const res = await http.getAsync('/users', { page: 1 })
    console.log('数据列表：', res.data)
  } catch (err) {
    console.error('获取失败', err)
  }
}
&lt;/script&gt;</code></pre>
        </div>
      </section>

      <!-- 模块 4: 权限验证指令 -->
      <section id="section-directive" class="doc-section">
        <h2 class="section-title"><span class="number">04.</span> 按钮级权限控制 (v-permission)</h2>
        <p class="section-desc">
          项目自定义并全局注册了 <code>v-permission</code> 权限控制指令。该指令在挂载时自动比对当前用户的权限列表，无权时直接隐藏相关 DOM。
        </p>
        <div class="code-block-wrapper" v-pre>
          <div class="code-header">
            <span class="code-lang">JavaScript</span>
            <span class="code-path">directives/permission.js</span>
          </div>
          <pre><code>function checkPermission(el, binding) {
  const userStore = useAppInfoStore()
  const permissions = userStore.permissions || []
  let permission = binding.value || binding.arg

  if (!permissions.includes(permission)) {
    el.style.display = 'none' // 隐藏无权限元素
  } else {
    el.style.display = ''
  }
}</code></pre>
        </div>
        <div class="usage-guide" v-pre>
          <h4>💡 使用示例：</h4>
          <p>绑定指定权限名，可采用绑定值或参数形式：</p>
          <pre><code>&lt;!-- 方式 A：直接传入字符串权限名 --&gt;
&lt;button v-permission="'admin'"&gt;管理员专享操作&lt;/button&gt;

&lt;!-- 方式 B：传指令参数形式 --&gt;
&lt;button v-permission:user_edit&gt;编辑用户权限&lt;/button&gt;</code></pre>
        </div>
      </section>

      <!-- 模块 5: 语言国际化 -->
      <section id="section-i18n" class="doc-section">
        <h2 class="section-title"><span class="number">05.</span> 国际化语言支持 (vue-i18n) 与 CSV 自动构建工具</h2>
        <p class="section-desc">
          国际化模块使用原生 ES 模块的 Top-level await，在初始化加载阶段直接请求 JSON 文件填充本地语言字典。为了方便翻译维护，项目提供了一套专用的 <code>CSV -> JSON</code>
          自动构建机制，使得非技术人员直接通过 Excel 编辑 CSV 即可更新翻译包。
        </p>

        <!-- 自动构建工具说明 -->
        <div class="csv-table-wrapper" v-pre>
          <div class="table-title">📂 i18n/langs.csv（数据源表格结构示意）</div>
          <table class="csv-table">
            <thead>
              <tr>
                <th>zh-CN (简体中文 / 主键)</th>
                <th>en-US (英文翻译列)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>渐进式 JavaScript 架构</td>
                <td>Progressive JavaScript Architecture</td>
              </tr>
              <tr>
                <td>站点全局配置</td>
                <td>Global Configuration</td>
              </tr>
              <tr>
                <td>数据列表：</td>
                <td>Data List:</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="code-block-wrapper" v-pre>
          <div class="code-header">
            <span class="code-lang">Bash Command</span>
            <span class="code-path">Terminal</span>
          </div>
          <pre><code># 运行翻译文件编译打包命令（在根目录下执行，自动输出各语种 JSON）
node i18n/build.js</code></pre>
        </div>

        <div class="code-block-wrapper" v-pre>
          <div class="code-header">
            <span class="code-lang">JavaScript</span>
            <span class="code-path">i18n/index.js</span>
          </div>
          <pre><code>// 动态载入远程 JSON 翻译字典
try {
  const [zhRes, enRes] = await Promise.all([
    fetch('./i18n/zh-CN.json').then(r => r.json()),
    fetch('./i18n/en-US.json').then(r => r.json())
  ])
  i18n.global.setLocaleMessage('zh-CN', zhRes)
  i18n.global.setLocaleMessage('en-US', enRes)
} catch (error) {
  console.error('加载 JSON 语言包失败:', error)
}</code></pre>
        </div>

        <div class="usage-guide" v-pre>
          <h4>💡 使用与构建说明：</h4>
          <p>
            1. <strong>表格维护</strong>：直接编辑 <code>i18n/langs.csv</code>。表格首行为双列结构：第一列为
            <code>zh-CN</code>（中文原句，直接作为翻译主键），第二列为 <code>en-US</code>（对应的英文翻译）。<br>
            2. <strong>一键打包</strong>：在终端执行 <code>node i18n/build.js</code>，系统将读取该 CSV 表并自动为各语种编译、分割、导出独立的
            <code>zh-CN.json</code> 和 <code>en-US.json</code> 词典文件。<br>
            3. <strong>模版中使用</strong>：模版中直接翻译，或通过 i18n 提供的组合式 API 进行切换：
          </p>
          <pre><code>&lt;template&gt;
  &lt;p&gt;{{ $t('渐进式 JavaScript 架构') }}&lt;/p&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const setLang = (lang) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
}
&lt;/script&gt;</code></pre>
        </div>
      </section>

      <!-- 模块 6: 站点全局配置 -->
      <section id="section-config" class="doc-section">
        <h2 class="section-title"><span class="number">06.</span> 站点全局配置 (config.js)</h2>
        <p class="section-desc">
          所有的基础参数（项目名称、站点说明、版本号、请求基础路径等）全部外置解耦到根目录下的 <code>config.js</code>，在 HTML 中以同步脚本载入挂载，修改配置无需重复构建代码。
        </p>
        <div class="code-block-wrapper" v-pre>
          <div class="code-header">
            <span class="code-lang">JavaScript</span>
            <span class="code-path">config.js</span>
          </div>
          <pre><code>window.SITE_CONFIG = {
  title: 'Vue3 CDN Scaffold', // 站点标题，用于页面 title 等展示。
  description: '基于原生 Vue 3 CDN + ESM，免编译、零打包、开箱即用的极简前端开发脚手架。本文档详细介绍了项目中集成的核心模块及其具体用法。', // 站点说明，用于页面介绍、SEO 或组件展示。
  copyright: 'Copyright © 2026', // 版权信息，用于页脚展示。
  baseURL: '/api', // 接口请求基础路径。
  version: '1.0.0(2026-06-01)', // 站点版本号，方便展示或排查当前发布版本。
  remCssVersion: '202606021', // rem CSS 版本号，拼接到样式 URL 后用于控制浏览器缓存更新。
  remCssUrls: ['./assets/css/global.css'], // 需要运行时转换 px -> rem 的全局样式表。
  openPxToRem: false, // 是否开启运行时 px -> rem 转换。
  pxToRemBase: 16, // px 转 rem 的换算基准，16px = 1rem。
  designWidth: 375, // 设计稿宽度，用于按视口比例计算 html 根字号。
  minRootFontSize: 14, // html 根字号最小值，避免小屏字号过小。
  maxRootFontSize: 36 // html 根字号最大值，避免大屏字号过大。
};</code></pre>
        </div>
      </section>
    </main>

    <!-- 页脚版权 -->
    <footer class="doc-footer">
      <p>{{ siteInfo.copyright }} | Version {{ siteInfo.version }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'Home'
})

// 获取全局站点信息
const siteInfo = window.SITE_CONFIG

// 平滑滚动到指定锚点，避免与 Hash 路由冲突，并留出粘性导航栏的高度
function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    const navBar = document.querySelector('.sticky-nav-bar')
    const navBarHeight = navBar ? navBar.offsetHeight : 90
    const yOffset = -(navBarHeight + 16) // 动态偏移：导航条实际高度 + 16 像素的外边距
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
</script>
<style>
body {
  min-height: 100vh;
  line-height: 1.5;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", sans-serif;
  color: #1f2937;
  background: #f9fafb;
}
</style>
<style scoped>
/* 全局页面居中与清爽炫酷风格 */
.doc-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 60px 24px;
  color: #334155;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.62;
  position: relative;
}

/* 在顶部添加柔和炫酷的极光光晕背景 */
.doc-container::before {
  content: "";
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  height: 250px;
  background: radial-gradient(circle, rgba(0, 242, 254, 0.1) 0%, rgba(66, 211, 146, 0.05) 50%, rgba(255, 255, 255, 0) 100%);
  z-index: -1;
  pointer-events: none;
}

/* 头部介绍排版 - 压缩间距以显得更加紧凑 */
.doc-hero {
  text-align: center;
  padding-bottom: 24px;
  border-bottom: 1px dashed #cbd5e1;
  margin-bottom: 24px;
}

.hero-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: #0d9488;
  background: linear-gradient(135deg, rgba(45, 212, 191, 0.15) 0%, rgba(56, 189, 248, 0.1) 100%);
  border: 1.5px solid rgba(45, 212, 191, 0.25);
  padding: 5px 14px;
  border-radius: 30px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.05);
}

.hero-title {
  font-size: 46px;
  font-weight: 850;
  letter-spacing: -0.05em;
  margin: 0 0 18px 0;
  background: linear-gradient(135deg, #02b373 0%, #0d9488 40%, #0284c7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 16.5px;
  color: #64748b;
  max-width: 740px;
  margin: 0 auto 36px auto;
  font-weight: 450;
}

/* 粘性悬浮导航条 - 现代毛玻璃设计 */
.sticky-nav-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  background: rgba(245, 247, 251);
  /* 匹配全局底色并带有高透明度 */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 16px 12px;
  margin-top: -10px;
  margin-bottom: 32px;
  border-bottom: 1px solid rgba(203, 213, 225, 0.5);
  border-radius: 0 0 12px 12px;
}

.quick-nav {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  width: 100%;
}

.nav-btn {
  background: #f8fafc;
  color: #475569;
  text-decoration: none;
  font-size: 12.5px;
  font-weight: 600;
  padding: 8px 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  text-align: center;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.nav-btn:hover {
  background: #f0fdfa;
  border-color: #99f6e4;
  color: #0d9488;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.08);
}

/* 文档列表主体 - 减小卡片之间的空隙 */
.doc-content {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* 将每一个模块包装为精美的白底卡片 */
.doc-section {
  scroll-margin-top: 100px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.02);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 768px) {
  .doc-section {
    scroll-margin-top: 140px;
  }
}

@media (max-width: 480px) {
  .doc-section {
    scroll-margin-top: 230px;
  }
}

.doc-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(13, 148, 136, 0.05);
}

.section-title {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  border-bottom: 2px dashed #f1f5f9;
  padding-bottom: 12px;
}

.section-title .number {
  background: linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-right: 10px;
  font-family: "Fira Code", Monaco, monospace;
}

.section-desc {
  font-size: 15px;
  color: #475569;
  margin-bottom: 20px;
}

/* 代码块样式设计 - 炫酷暗黑风格，带玻璃微发光效果 */
.code-block-wrapper {
  background: #111827;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 18px;
  border: 1px solid #1f2937;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.15);
  transition: border-color 0.3s;
}

.code-block-wrapper:hover {
  border-color: rgba(13, 148, 136, 0.3);
}

.code-header {
  background: #0b0f19;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1f2937;
}

.code-lang {
  color: #6b7280;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.code-path {
  color: #2dd4bf;
  font-size: 11.5px;
  font-family: monospace;
  font-weight: 600;
}

pre {
  margin: 0;
  padding: 20px;
  overflow-x: auto;
}

code {
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 13.5px;
}

/* 块级代码块的字色 */
pre code {
  color: #e2e8f0;
}

/* 行内代码（比如段落里的文件名、库名等）的字色与背景 */
:not(pre)>code {
  color: #0f172a;
  background: #f1f5f9;
  border: 1.5px solid #e2e8f0;
  padding: 2px 6px;
  border-radius: 5px;
  font-size: 12.5px;
  font-weight: 600;
}

/* 说明内嵌卡片 - 炫酷清新的淡绿透亮设计 */
.usage-guide {
  background: linear-gradient(135deg, #f0fdfa 0%, #f0fdf4 100%);
  border-left: 5px solid #2dd4bf;
  border-top: 1px solid rgba(45, 212, 191, 0.15);
  border-right: 1px solid rgba(45, 212, 191, 0.15);
  border-bottom: 1px solid rgba(45, 212, 191, 0.15);
  padding: 20px;
  border-radius: 0 12px 12px 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
}

.usage-guide h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #0f172a;
  font-weight: 755;
}

.usage-guide p {
  margin: 0 0 14px 0;
  font-size: 13.5px;
  color: #475569;
}

.usage-guide code {
  color: #0f172a;
  background: rgba(45, 212, 191, 0.2);
  padding: 3px 7px;
  border-radius: 5px;
  font-size: 12.5px;
  font-weight: 600;
  font-family: monospace;
}

.usage-guide pre {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.01);
}

.usage-guide pre code {
  color: #334155;
  background: transparent;
  padding: 0;
}

/* 页脚 */
.doc-footer {
  text-align: center;
  margin-top: 96px;
  padding-top: 28px;
  border-top: 1px dashed #e2e8f0;
  color: #94a3b8;
  font-size: 13px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .quick-nav {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 480px) {
  .quick-nav {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 34px;
  }

  .doc-container {
    padding: 24px 12px;
  }

  .doc-section {
    padding: 20px 14px;
  }

  pre {
    padding: 14px;
  }

  .csv-table-wrapper {
    padding: 12px;
  }
}

/* i18n CSV 数据源表格美化样式 */
.csv-table-wrapper {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 20px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.01);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table-title {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.csv-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
}

.csv-table th {
  background: #f8fafc;
  color: #475569;
  font-weight: 700;
  padding: 10px 14px;
  border-bottom: 2px solid #e2e8f0;
}

.csv-table td {
  padding: 10px 14px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  font-family: monospace;
}

.csv-table tr:hover td {
  background: #f8fafc;
}

.csv-table tr:last-child td {
  border-bottom: none;
}
</style>
