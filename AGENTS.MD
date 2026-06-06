# AGENTS.MD

本文件给后续协作 agent 使用。请以 `views/Showcase.vue` 作为功能参考页和实现风格基准。

## 项目定位

这是一个基于 Vue 3 CDN 的零构建前端脚手架。项目不使用 Vite、Webpack 或 npm build 流程，浏览器通过 CDN 依赖和 `vue3-sfc-loader` 直接运行 `.vue` 单文件组件。

修改代码时优先保持轻量、静态、免编译的架构，不引入需要打包的新依赖。

## 运行方式

- 不要直接双击打开 `index.html`，`.vue` 文件需要通过 HTTP 服务加载。
- 推荐在项目根目录运行 `start.bat`，默认端口参考 showcase 中的 `8080`。
- 也可以使用静态服务，例如 `python -m http.server 8080`。
- 访问地址通常为 `http://localhost:8080/#/home` 或 `http://localhost:8080/#/showcase`。

## Showcase 覆盖能力

`views/Showcase.vue` 展示并验证以下能力，新增功能时应尽量复用这些模式：

- 组件自动注册与路由导航
- `vue-i18n` 多语言切换与 CSV 字典构建
- Pinia 状态管理与本地持久化
- `v-permission` 按钮级权限控制
- `config.js` 全局配置与运行时 px -> rem 控制
- Axios 请求封装、统一错误处理和手动错误处理
- Blob 文件下载
- `window.utils` 通用工具函数
- 本地开发服务和语言包构建指令展示

## 全局配置

站点配置统一维护在根目录 `config.js`：

```js
window.SITE_CONFIG = {
  title: 'Vue3 CDN Scaffold',
  description: '基于原生 Vue 3 CDN + ESM，免编译、零打包、开箱即用的极简前端开发脚手架。本文档详细介绍了项目中集成的核心模块及其具体用法。',
  copyright: 'Copyright © 2026',
  baseURL: '/api',
  version: '1.0.0(2026-06-01)',
  remCssVersion: '202606021',
  remCssUrls: ['./assets/css/global.css'],
  openPxToRem: false,
  pxToRemBase: 16,
  designWidth: 375,
  minRootFontSize: 14,
  maxRootFontSize: 36
}
```

注意事项：

- 路由标题、首页标题、等都应读取 `window.SITE_CONFIG`。
- `openPxToRem` 当前保持为 `false`，除非任务明确要求开启运行时转换。
- 修改 `remCssUrls` 或 `remCssVersion` 时，同步检查 `main.js` 和 `utils/loader.js` 的加载逻辑。

## 路由约定

路由配置位于 `router/index.js`。

- 使用 Hash 路由：`createWebHashHistory()`。
- 页面路由通过 `routeDefinitions` 维护，一行一个配置项。
- `component` 字段写组件名，不带 `.vue` 后缀，最终由 `loadRouteVue('./views/xxx.vue')` 加载。
- 路由标题使用 `meta.title`，在全局守卫里通过 i18n 翻译后拼接站点标题。
- 新增页面时，在 `views/` 下新增 `.vue` 文件，并同步追加 `routeDefinitions`。

## 组件约定

公共组件注册位于 `components/index.js`。

- 通用组件通过 `loadComponents(app)` 全局注册。
- 组件路径使用 `loadVue('./components/ComponentName.vue')`。
- 已注册组件可以在 SFC 模板中直接使用，不需要在页面内 import。
- 新增通用组件时，补充 `{ name, path }` 配置，并确保名称清晰稳定。

## Store 与权限

Pinia store 以全局State函数挂载：

- `stores/appInfo.js` 暴露 `window.useAppInfoStore`

约定：

- store 使用 `persist: true`，状态会持久化到本地。
- 在 SFC `<script setup>` 中可以直接调用 `useAppInfoStore()`。
- 权限列表来自 `appInfo.permissions`。
- 权限指令支持 `v-permission="'admin'"` 和 `v-permission:user` 两种写法。
- 系统全局的保存在此地方

## HTTP 约定

HTTP 插件位于 `plugins/http.js`，封装位于 `utils/axios.js`。

- `window.http`、`app.provide('http', http)` 和 `$http` 都会挂载同一套 API。
- `axios.defaults.baseURL` 来自 `window.SITE_CONFIG.baseURL`。
- 请求头会从 `localStorage.getItem('token')` 写入 `authorization`。
- `getAsync(url, params, options)` 和 `postAsync(url, params, options)` 支持 `autoHandleError`。
- 默认 `autoHandleError: true`，接口 `code != 0` 时统一 alert。
- 需要静默处理失败时传 `{ autoHandleError: false }`，参考 `Showcase.vue` 的手动失败请求。
- 文件下载使用 `downloadAsync(url, filename, params, method, options)`。

## 国际化约定

i18n 配置位于 `i18n/index.js`。

- 默认语言和 fallback 都是 `zh-CN`。
- 当前语言存储在 `localStorage` 的 `lang`。
- 翻译源表维护在 `i18n/lang.csv`。
- 修改翻译后运行 `node i18n/build.js` 生成新的 `lang.[hash].json`。
- 如果生成的 JSON 文件名变化，需要同步更新 `i18n/index.js` 中的 fetch 路径。
- 页面文本如需国际化，优先使用 `$t('中文主键')` 或 `useI18n()`。

## Utils 与 Loader

- `utils/utils.js` 挂载全局 `window.utils`，showcase 使用了 `formatDate` 和 `sleep`。
- `utils/loader.js` 负责 `loadVue`、`loadRouteVue`、样式注入和可选 px -> rem 转换。
- 不要绕过 `loadVue` / `loadRouteVue` 手写动态 import，这个项目没有构建工具。
- 如果改动 `.vue` 样式或全局 CSS，注意 `openPxToRem` 对源码和 CSS 文本的运行时转换影响。

## 页面与样式风格
- 风格保持一致
- 公共变量放在在 assets/css/global.css

## 编辑原则

- 保持无构建、无 npm 依赖的项目特性。
- 新增功能先看 `Showcase.vue` 是否已有同类示例。
- 不要随意改动 `assets/libs/vendor.min.js`。
- 不要把第三方 CDN 依赖拆进 npm 包管理，除非用户明确要求重构项目。
- 代码以清晰直接为主，避免引入复杂抽象。

