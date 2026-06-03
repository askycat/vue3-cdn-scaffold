<template>
  <div class="showcase-container">
    
    <!-- Hero / Header Section -->
    <header class="showcase-hero">
      <div class="hero-top">
        <router-link to="/Home" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          返回文档首页
        </router-link>
        <span class="hero-badge">Scaffold Features</span>
      </div>
      <h1 class="hero-title">脚手架功能特性展示</h1>
      <p class="hero-subtitle">
        在这里，您可以直接体验并调试项目中集成的各个核心能力：动态组件注册、多语言翻译、状态管理、按钮权限、CSS 运行时缩放及 Axios 网络请求拦截等。
      </p>
    </header>

    <!-- Main Grid Content -->
    <div class="showcase-grid">
      
      <!-- Box 1: 自动组件引入 & 页面路由 -->
      <section class="showcase-card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        </div>
        <h3 class="card-title">组件注册与路由导航</h3>
        <p class="card-desc">
          基于 <code>components/index.js</code> 的自动遍历注册机制，所有通用组件无需手动 <code>import</code> 即可在模板中直接调用。
        </p>
        
        <div class="card-demo-box">
          <div class="demo-label">自动引入的 AppHeader 组件预览：</div>
          <div class="embedded-header-preview">
            <AppHeader />
          </div>
          
          <div class="demo-label margin-top">动态页面路由演示：</div>
          <router-link to="/Home" class="btn btn-outline btn-full-width">
            <span>跳转到文档首页</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </router-link>
        </div>
      </section>

      <!-- Box 2: 国际化多语言 -->
      <section class="showcase-card">
        <div class="card-icon font-gradient">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
        <h3 class="card-title">多语言国际化 (i18n)</h3>
        <p class="card-desc">
          系统翻译字典维护在 <code>i18n/lang.csv</code> 中，由编译脚本 <code>i18n/build.js</code> 自动读取并输出为 <code>lang.[hash].json</code>。客户端运行阶段通过 fetch 动态载入对应语言包。
        </p>

        <div class="card-demo-box">
          <div class="translation-preview">
            <div class="translation-key">翻译文本示例:</div>
            <div class="translation-value">{{ $t("多语言示例") }}</div>
          </div>

          <div class="locale-status">
            <span>{{ $t("当前语言") }}:</span>
            <span class="locale-badge" :class="locale">{{ locale === 'zh-CN' ? '简体中文 (zh-CN)' : 'English (en-US)' }}</span>
          </div>

          <div class="btn-group">
            <button class="btn btn-sm" :class="{ 'btn-primary': locale === 'zh-CN', 'btn-secondary': locale !== 'zh-CN' }" @click="$i18n.locale = 'zh-CN'">
              简体中文
            </button>
            <button class="btn btn-sm" :class="{ 'btn-primary': locale === 'en-US', 'btn-secondary': locale !== 'en-US' }" @click="$i18n.locale = 'en-US'">
              English
            </button>
          </div>

          <div class="demo-label margin-top">字典编译编译流程：</div>
          <div class="workflow-info">
            <div class="workflow-step">
              <span class="badge-step">Step 1</span>
              <span>编辑翻译源表 <code>i18n/lang.csv</code></span>
            </div>
            <div class="workflow-step">
              <span class="badge-step">Step 2</span>
              <span>运行构建指令 <code>node i18n/build.js</code></span>
            </div>
            <div class="workflow-step">
              <span class="badge-step">Step 3</span>
              <span>生成 JSON 词典 <code>lang.[hash].json</code> 供客户端拉取</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Box 3: 全局 Store 与权限指令 -->
      <section class="showcase-card">
        <div class="card-icon text-sky">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h3 class="card-title">状态管理与按钮级权限</h3>
        <p class="card-desc">
          使用 Pinia 状态管理用户权限，结合全局指令 <code>v-permission</code> 控制节点显隐，无需编写繁杂的条件渲染。
        </p>

        <div class="card-demo-box">
          <div class="role-status">
            <span>当前用户角色:</span>
            <span class="role-badge" :class="appStore.permissions.includes('admin') ? 'admin' : 'user'">
              {{ appStore.permissions.includes('admin') ? '🔑 管理员 (admin)' : '👤 普通用户 (user)' }}
            </span>
          </div>

          <div class="btn-group">
            <button class="btn btn-sm" :class="{ 'btn-primary': appStore.permissions.includes('admin'), 'btn-secondary': !appStore.permissions.includes('admin') }" @click="appStore.setPermissions('admin')">
              切换为管理员
            </button>
            <button class="btn btn-sm" :class="{ 'btn-primary': appStore.permissions.includes('user') && !appStore.permissions.includes('admin'), 'btn-secondary': !appStore.permissions.includes('user') || appStore.permissions.includes('admin') }" @click="appStore.setPermissions('user')">
              切换为普通用户
            </button>
          </div>

          <div class="demo-label margin-top">指令渲染效果演示 (v-permission)：</div>
          <div class="permission-box">
            <div v-permission="'admin'" class="permission-item permission-admin">
              <span class="badge badge-admin">仅限管理员可见</span>
              <p>🔒 您当前拥有管理员角色，所以能看到这个安全卡片。</p>
            </div>
            <div v-permission:user class="permission-item permission-user">
              <span class="badge badge-user">仅限普通用户可见</span>
              <p>👤 您当前拥有普通用户角色，所以能看到这个专属卡片。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Box 4: 运行时 px to rem 转换说明 -->
      <section class="showcase-card">
        <div class="card-icon text-amber">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
            <line x1="15" y1="3" x2="15" y2="21"></line>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="3" y1="15" x2="21" y2="15"></line>
          </svg>
        </div>
        <h3 class="card-title">运行时 px -> rem 动态转换</h3>
        <p class="card-desc">
          在 <code>config.js</code> 中配置 <code>remCssUrls</code>，通过 <code>utils/loader.js</code> 实现页面在没有任何编译的前提下自动支持响应式 rem 尺寸换算。
        </p>

        <div class="card-demo-box">
          <div class="css-config-info">
            <div class="config-item">
              <span class="config-name">是否开启转换:</span>
              <span class="config-val-badge" :class="{ active: siteConfig.openPxToRem }">
                {{ siteConfig.openPxToRem ? '已开启' : '未开启 (默认像素值)' }}
              </span>
            </div>
            <div class="config-item">
              <span class="config-name">基准字号 (1rem):</span>
              <span class="config-val-text">{{ siteConfig.pxToRemBase }}px</span>
            </div>
            <div class="config-item">
              <span class="config-name">转换样式文件:</span>
              <span class="config-val-code">/assets/css/global.css</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Box 5: 文件下载 -->
      <section class="showcase-card">
        <div class="card-icon text-rose">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </div>
        <h3 class="card-title">文件下载</h3>
        <p class="card-desc">
          基于 Axios 的 <code>http.download()</code>，它会自动处理 Response 文件流，并利用浏览器 Blob 触发优雅命名下载。
        </p>

        <div class="card-demo-box">
          <div class="download-playground">
            <button class="btn btn-primary btn-full-width" :disabled="downloadStatus === 'downloading'" @click="downloadImage">
              <span v-if="downloadStatus === 'idle'">
                立即下载演示图片 (Mona Lisa)
              </span>
              <span v-else-if="downloadStatus === 'downloading'" class="loading-wrapper">
                <span class="spinner-inline"></span>
                正在发起下载并保存...
              </span>
              <span v-else-if="downloadStatus === 'completed'">
                🎉 下载成功！
              </span>
            </button>
            <div class="download-info">图片 URL: <code>https://disk.sample.cat/samples/jpg/monalisa-1200x1200.jpg</code></div>
          </div>
        </div>
      </section>

      <!-- Box 7: Pinia 状态持久化与登录模拟 -->
      <section class="showcase-card">
        <div class="card-icon text-indigo">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h3 class="card-title">数据持久化与登录模拟</h3>
        <p class="card-desc">
          基于 Pinia 状态管理及持久化插件，演示全局计数器与模拟登录。即使刷新页面，状态也会安全保留在本地缓存中。
        </p>

        <div class="card-demo-box">
          <!-- Counter Sub-demo -->
          <div class="demo-sub-section">
            <div class="sub-title">🔢 计数器持久化 (useCounterStore)：</div>
            <div class="counter-display">
              <span class="counter-num">数值: <strong>{{ counterStore.count }}</strong></span>
              <span class="counter-double">双倍: {{ counterStore.doubleCount }}</span>
              <button class="btn btn-sm btn-primary" @click="counterStore.increment">
                +1 递增
              </button>
            </div>
          </div>

          <!-- Auth Sub-demo -->
          <div class="demo-sub-section margin-top">
            <div class="sub-title">模拟登录会话演示 (useAppInfoStore)：</div>
            
            <div v-if="appStore.token" class="login-profile">
              <div class="profile-info">
                <div>用户名: <strong>{{ appStore.userInfo?.name || '未知用户' }}</strong></div>
                <div class="token-text">Token: <code>{{ appStore.token.substring(0, 20) }}...</code></div>
              </div>
              <button class="btn btn-sm btn-danger btn-full-width" @click="appStore.logout">
                退出登录
              </button>
            </div>
            
            <div v-else class="login-form">
              <div class="input-group">
                <input type="text" v-model="mockUsername" placeholder="输入模拟用户名" class="input-text" />
                <button class="btn btn-sm btn-primary" :disabled="!mockUsername.trim()" @click="simulateLogin">
                  模拟登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Box 8: 常用开发工具集 (Utilities) -->
      <section class="showcase-card">
        <div class="card-icon text-teal">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <h3 class="card-title">通用开发工具库 (Utils)</h3>
        <p class="card-desc">
          调用 <code>utils/utils.js</code> 挂载的全局辅助函数，包含常用的日期格式化与异步延迟等高频开发工具。
        </p>

        <div class="card-demo-box">
          <!-- Date Format Sub-demo -->
          <div class="demo-sub-section">
            <div class="sub-title">📅 实时时间格式化 (utils.formatDate)：</div>
            <div class="time-formatter">
              <div class="config-item">
                <span class="config-name">当前时间:</span>
                <span class="config-val-text">{{ formattedTime }}</span>
              </div>
            </div>
          </div>

          <!-- Sleep Sub-demo -->
          <div class="demo-sub-section margin-top">
            <div class="sub-title">⏳ 异步延时模拟 (utils.sleep)：</div>
            <div class="sleep-simulator">
              <div class="input-group">
                <input type="number" v-model.number="sleepDuration" min="100" max="10000" step="100" class="input-text" />
                <span class="input-suffix">毫秒</span>
                <button class="btn btn-sm btn-primary" :disabled="isSleeping" @click="runSleep">
                  <span v-if="isSleeping" class="spinner-inline"></span>
                  {{ isSleeping ? '等待中...' : '启动延时' }}
                </button>
              </div>
              <div class="sleep-feedback" :class="{ active: isSleeping }">
                {{ sleepFeedback || '等待启动...' }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Box 9: 构建指令与服务运行 -->
      <section class="showcase-card">
        <div class="card-icon text-orange">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
        </div>
        <h3 class="card-title">构建指令与开发者环境</h3>
        <p class="card-desc">
          零构建成本。支持本地 PowerShell 轻量开发服务，并支持通过 Node.js 一键编译打包 CSV 语言字典。
        </p>

        <div class="card-demo-box">
          <div class="env-info-list">
            <div class="env-info-item">
              <span class="env-name">启动开发服务:</span>
              <span class="env-code">start.bat (Port: 8080)</span>
            </div>
            <div class="env-info-item">
              <span class="env-name">编译 CSV 语言包:</span>
              <span class="env-code">node i18n/build.js</span>
            </div>
            <div class="env-info-item">
              <span class="env-name">当前屏幕分辨率:</span>
              <span class="env-val">{{ screenResolution }}</span>
            </div>
            <div class="env-info-item">
              <span class="env-name">系统本地时区:</span>
              <span class="env-val">{{ userTimezone }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Box 6: API 请求与拦截器 (跨越两列，更宽敞) -->
      <section class="showcase-card col-span-2">
        <div class="card-icon text-violet">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        </div>
        <h3 class="card-title">统一接口请求 & 异常自动/手动拦截</h3>
        <p class="card-desc">
          调用 <code>plugins/http.js</code> 注入的 API。支持全局统一错误拦截（自动弹窗警告）以及调用方局部处理（通过传递 <code>autoHandleError: false</code> 进行静默异常处理）。
        </p>

        <div class="card-demo-box grid-layout">
          <div class="request-actions">
            <button class="btn btn-sm btn-success" @click="fetchData">
              <span>GET 正常数据请求</span>
            </button>
            <button class="btn btn-sm btn-warning" @click="fetchDataByAutoHandleError">
              <span>GET 失败请求 - 自动拦截</span>
            </button>
            <button class="btn btn-sm btn-danger" @click="fetchDataByManualHandleError">
              <span>GET 失败请求 - 手动拦截</span>
            </button>
          </div>

          <div class="request-console">
            <div class="console-header">
              <div class="console-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="console-title">RESPONSE JSON CONSOLE</span>
              <div class="console-badge-wrapper">
                <span v-if="reqStatus === 'loading'" class="c-badge c-badge-loading">
                  <span class="spinner-inline"></span> 请求中...
                </span>
                <span v-else-if="reqStatus === 'success'" class="c-badge c-badge-success">HTTP 200 SUCCESS</span>
                <span v-else-if="reqStatus === 'error'" class="c-badge c-badge-error">FAILED / INTERCEPTED</span>
                <span v-else class="c-badge c-badge-idle">IDLE</span>
              </div>
            </div>
            <div class="console-body">
              <pre v-if="responseData"><code>{{ responseData }}</code></pre>
              <div v-else class="console-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                  <line x1="7" y1="2" x2="7" y2="22"></line>
                  <line x1="17" y1="2" x2="17" y2="22"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <line x1="2" y1="7" x2="7" y2="7"></line>
                  <line x1="2" y1="17" x2="7" y2="17"></line>
                  <line x1="17" y1="17" x2="22" y2="17"></line>
                  <line x1="17" y1="7" x2="22" y2="7"></line>
                </svg>
                <p>等待发起请求，响应数据将实时渲染在此控制台</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

    <!-- Footer -->
    <footer class="showcase-footer">
      <p>{{ siteConfig.copyright }} | {{ siteConfig.title }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 脚本里使用多语言 
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
console.log(t('多语言示例'))
console.log("当前语言：", locale.value)

// 脚本里使用全局store
const appStore = useAppInfoStore()

// 获取全局配置
const siteConfig = window.SITE_CONFIG

// 交互状态控制
const responseData = ref('')
const reqStatus = ref('idle') // 'idle' | 'loading' | 'success' | 'error'
const activeReqType = ref('') // 'normal' | 'auto-fail' | 'manual-fail'
const downloadStatus = ref('idle') // 'idle' | 'downloading' | 'completed'

// 获取 counter store 和 utils 工具包
const counterStore = useCounterStore()
const utils = window.utils

// 登录模拟与工具函数交互状态
const mockUsername = ref('')
const sleepDuration = ref(1000)
const isSleeping = ref(false)
const sleepFeedback = ref('')
const formattedTime = ref(utils.formatDate(new Date()))

// 实时更新时间格式化
setInterval(() => {
    formattedTime.value = utils.formatDate(new Date())
}, 1000)

// 模拟登录行为
const simulateLogin = () => {
    if (!mockUsername.value.trim()) return
    appStore.setToken('mock-jwt-token-header.' + btoa(encodeURIComponent(mockUsername.value)) + '.signature')
    appStore.setUserInfo({ name: mockUsername.value.trim() })
    mockUsername.value = ''
}

// 模拟延时行为
const runSleep = async () => {
    if (isSleeping.value) return
    isSleeping.value = true
    sleepFeedback.value = `💤 正在执行 utils.sleep(${sleepDuration.value}ms)...`
    const start = Date.now()
    await utils.sleep(sleepDuration.value)
    const cost = Date.now() - start
    sleepFeedback.value = `✅ 延时结束！实际等待了 ${cost} 毫秒。`
    isSleeping.value = false
}

// 开发者环境信息
const screenResolution = ref(`${window.screen.width} x ${window.screen.height}`)
const userTimezone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone)

let loadingTimer = null

const startLoading = (reqType) => {
    activeReqType.value = reqType
    clearTimeout(loadingTimer)
    loadingTimer = setTimeout(() => {
        reqStatus.value = 'loading'
    }, 200) // 延迟 200ms 显示加载状态，防止极速请求导致的闪烁
}

const stopLoading = (finalStatus) => {
    clearTimeout(loadingTimer)
    reqStatus.value = finalStatus
}

// get请求
const fetchData = async () => {
    try {
        const response = await http.getAsync('mock.json', {})
        if (response.code !== 0) {
            console.error('请求失败:', response.message)
            stopLoading('error')
            responseData.value = `请求失败: ${response.message}`
            return
        }   
        stopLoading('success')
        responseData.value = JSON.stringify(response.data, null, 2)
    } catch (e) {
        stopLoading('error')
        responseData.value = `网络异常: ${e.message}`
    }
}

// 自动处理失败示例 (默认自动处理失败)
const fetchDataByAutoHandleError = async () => {
    try {
        const response = await http.getAsync('mock-fail.json', {})
        stopLoading('error')
        responseData.value = '自动拦截错误已触发 (页面已弹出 alert)\n\n接口返回内容:\n' + JSON.stringify(response, null, 2)
    } catch (e) {
        stopLoading('error')
        responseData.value = `发生异常: ${e.message || '请求失败'}`
    }
}

// 手动处理失败示例
const fetchDataByManualHandleError = async () => {
    try {
        const response = await http.getAsync('mock-fail.json', {}, { autoHandleError: false })
        if (response.code !== 0) {
            stopLoading('error')
            responseData.value = '手动处理失败 (静默拦截，未弹出全局 alert):\n\n' + JSON.stringify(response, null, 2)
        } else {
            stopLoading('success')
            responseData.value = JSON.stringify(response.data, null, 2)
        }
    } catch (e) {
        stopLoading('error')
        responseData.value = `发生异常: ${e.message}`
    }
}

// 下载图片
const downloadImage = async () => {
    downloadStatus.value = 'downloading'
    try {
        const imageUrl = 'https://disk.sample.cat/samples/jpg/monalisa-1200x1200.jpg'
        await http.download(imageUrl, '下载的图片.jpg')
        downloadStatus.value = 'completed'
        setTimeout(() => {
            downloadStatus.value = 'idle'
        }, 3000)
    } catch (e) {
        downloadStatus.value = 'idle'
        console.error('下载失败', e)
    }
}
</script>

<style scoped>
/* Page Layout */
.showcase-container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 24px;
  color: #334155;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
  position: relative;
}

/* Background Glowing Effect */
.showcase-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;
  height: 400px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(45, 212, 191, 0.04) 50%, rgba(255, 255, 255, 0) 100%);
  z-index: -1;
  pointer-events: none;
}

/* Hero Header */
.showcase-hero {
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  padding-bottom: 30px;
}

.hero-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #0d9488;
  transition: all 0.2s ease;
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(13, 148, 136, 0.05);
}

.back-link:hover {
  color: #0f766e;
  background: rgba(13, 148, 136, 0.1);
  transform: translateX(-2px);
}

.hero-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.15);
  padding: 4px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hero-title {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #4f46e5 0%, #0d9488 60%, #0ea5e9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 16px;
  color: #64748b;
  max-width: 800px;
  margin: 0;
  line-height: 1.5;
}

/* Grid Layout */
.showcase-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 868px) {
  .showcase-grid {
    grid-template-columns: 1fr;
  }
  .col-span-2 {
    grid-column: span 1 !important;
  }
}

.col-span-2 {
  grid-column: span 2;
}

/* Cards Design */
.showcase-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.showcase-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.08);
  border-color: rgba(99, 102, 241, 0.2);
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(99, 102, 241, 0.08);
  color: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.showcase-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

/* Icon Color Variants */
.card-icon.font-gradient {
  background: rgba(13, 148, 136, 0.08);
  color: #0d9488;
}
.card-icon.text-sky {
  background: rgba(14, 165, 233, 0.08);
  color: #0ea5e9;
}
.card-icon.text-amber {
  background: rgba(245, 158, 11, 0.08);
  color: #f59e0b;
}
.card-icon.text-rose {
  background: rgba(244, 63, 94, 0.08);
  color: #f43f5e;
}
.card-icon.text-violet {
  background: rgba(139, 92, 246, 0.08);
  color: #8b5cf6;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.card-desc {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 20px 0;
  flex-grow: 1;
}

/* Demo Box Area */
.card-demo-box {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 16px;
  margin-top: auto;
}

.demo-label {
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.demo-label.margin-top {
  margin-top: 16px;
}

/* Component Inside Box Styles */
.embedded-header-preview {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.embedded-header-preview :deep(.app-header) {
  height: 48px;
  background: #0f172a;
}

/* Buttons System */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s, box-shadow 0.2s, opacity 0.2s;
  user-select: none;
  width: auto;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
}

.btn:active:not(:disabled) {
  opacity: 0.8;
}

.btn-full-width {
  width: 100%;
}

.btn-sm {
  padding: 7px 14px;
  font-size: 13px;
}

.btn-primary {
  background: #0d9488;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(13, 148, 136, 0.2);
}

.btn-primary:hover:not(:disabled) {
  background: #0f766e;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
}

.btn-secondary {
  background: #ffffff;
  color: #475569;
  border: 1px solid #cbd5e1;
}

.btn-secondary:hover:not(:disabled) {
  background: #f8fafc;
  color: #1e293b;
  border-color: #94a3b8;
}

.btn-outline {
  background: transparent;
  color: #0d9488;
  border: 1.5px solid #0d9488;
}

.btn-outline:hover {
  background: rgba(13, 148, 136, 0.05);
  color: #0f766e;
  border-color: #0f766e;
}

.btn-success {
  background: #10b981;
  color: white;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.15);
}

.btn-success:hover:not(:disabled) {
  background: #059669;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}

.btn-warning {
  background: #f59e0b;
  color: white;
  box-shadow: 0 2px 6px rgba(245, 158, 11, 0.15);
}

.btn-warning:hover:not(:disabled) {
  background: #d97706;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
}

.btn-danger {
  background: #ef4444;
  color: white;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.15);
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-group {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.btn-group .btn {
  flex: 1;
}

/* Locale section */
.translation-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 12px;
}

.translation-key {
  font-size: 13px;
  color: #64748b;
}

.translation-value {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.locale-status, .role-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #475569;
  margin-bottom: 14px;
}

.locale-badge, .role-badge {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
}

.locale-badge.zh-CN {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.locale-badge.en-US {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.role-badge.admin {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.role-badge.user {
  background: rgba(100, 116, 139, 0.1);
  color: #64748b;
}

/* Permission conditional blocks */
.permission-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.permission-item {
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid transparent;
  animation: fadeIn 0.3s ease-out;
}

.permission-admin {
  background: rgba(139, 92, 246, 0.03);
  border-color: rgba(139, 92, 246, 0.15);
  border-left: 4px solid #8b5cf6;
}

.permission-user {
  background: rgba(14, 165, 233, 0.03);
  border-color: rgba(14, 165, 233, 0.15);
  border-left: 4px solid #0ea5e9;
}

.badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  align-self: flex-start;
}

.badge-admin {
  background: #8b5cf6;
  color: white;
}

.badge-user {
  background: #0ea5e9;
  color: white;
}

/* CSS config details */
.css-config-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.config-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  padding: 8px 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.config-name {
  color: #64748b;
}

.config-val-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
}

.config-val-badge.active {
  background: rgba(16, 185, 129, 0.08);
  color: #10b981;
}

.config-val-text {
  font-weight: 700;
  color: #334155;
}

.config-val-code {
  font-family: monospace;
  font-weight: 600;
  color: #0f172a;
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

/* Download details */
.download-playground {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.download-info {
  font-size: 11px;
  color: #94a3b8;
  text-align: center;
  word-break: break-all;
}

/* API Request Console Structure */
.grid-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}

.request-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
}

.request-actions .btn {
  justify-content: flex-start;
  text-align: left;
}

.request-console {
  background: #0f172a;
  border-radius: 12px;
  border: 1px solid #1e293b;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  height: 280px;
}

.console-header {
  background: #090d16;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1e293b;
}

.console-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #10b981; }

.console-title {
  font-family: monospace;
  font-size: 11px;
  color: #64748b;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.c-badge {
  font-family: monospace;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}

.c-badge-idle {
  background: #1e293b;
  color: #94a3b8;
}

.c-badge-loading {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  display: flex;
  align-items: center;
  gap: 4px;
}

.c-badge-success {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

.c-badge-error {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
}

.console-body {
  padding: 16px;
  overflow-y: auto;
  flex-grow: 1;
  font-family: Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  color: #e2e8f0;
}

.console-body pre {
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
}

.console-body code {
  color: #38bdf8;
  font-size: 12.5px;
  white-space: pre-wrap;
  word-break: break-all;
}

.console-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #475569;
  text-align: center;
  gap: 12px;
  padding: 20px 0;
}

.console-placeholder p {
  font-size: 13px;
  margin: 0;
}

.icon-inline {
  vertical-align: middle;
  margin-right: 4px;
}

/* Footer */
.showcase-footer {
  text-align: center;
  margin-top: 60px;
  padding-top: 20px;
  border-top: 1px dashed #cbd5e1;
  color: #94a3b8;
  font-size: 12px;
}

/* Spinners */
.spinner-inline {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  vertical-align: middle;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Demo box sections */
.demo-sub-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sub-title {
  font-size: 12px;
  font-weight: 700;
  color: #475569;
}

.counter-display {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
}

.counter-num strong {
  color: #6366f1;
  font-size: 15px;
}

.counter-double {
  color: #94a3b8;
  flex-grow: 1;
}

/* Input elements */
.input-group {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.input-text {
  flex-grow: 1;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  color: #1e293b;
  outline: none;
  transition: all 0.2s ease;
  width: 50%;
}

.input-text:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
}

.input-suffix {
  font-size: 13px;
  color: #64748b;
  white-space: nowrap;
}

/* Auth simulation */
.login-profile {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #ffffff;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.token-text {
  font-size: 11px;
  color: #64748b;
  word-break: break-all;
}

/* Sleep interactive area */
.sleep-feedback {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 8px;
  text-align: center;
}

.sleep-feedback.active {
  color: #0d9488;
  font-weight: 600;
}

/* Developer tools environments */
.env-info-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.env-info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding: 6px 10px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.env-name {
  color: #64748b;
}

.env-code {
  font-family: monospace;
  font-weight: 600;
  color: #334155;
  background: #f1f5f9;
  padding: 1px 4px;
  border-radius: 3px;
}

.env-val {
  font-weight: 600;
  color: #334155;
}

/* i18n Workflow */
.workflow-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #ffffff;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 12px;
  margin-top: 10px;
}

.workflow-step {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
}

.badge-step {
  background: rgba(99, 102, 241, 0.08);
  color: #6366f1;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
}

/* Color theme icons */
.card-icon.text-indigo {
  background: rgba(99, 102, 241, 0.08);
  color: #6366f1;
}
.card-icon.text-teal {
  background: rgba(20, 184, 166, 0.08);
  color: #14b8a6;
}
.card-icon.text-orange {
  background: rgba(249, 115, 22, 0.08);
  color: #f97316;
}
</style>