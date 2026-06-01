# Vue3 CDN App

一个基于 Vue 3 CDN 的前端示例项目，适合用于学习 Vue 3、Vue Router、Pinia、国际化和单文件组件的基础组织方式。项目无需 Vite、Webpack 或 npm build 流程，通过浏览器加载 CDN 资源与 `vue3-sfc-loader` 运行 `.vue` 单文件组件。

## 项目特点

- 使用 Vue 3 CDN 方式运行
- 支持 Vue Router 4 Hash 路由
- 使用 `vue3-sfc-loader` 加载 `.vue` 单文件组件
- 集成 Pinia 状态管理
- 支持基础国际化配置
- 包含插件、指令、工具方法和模拟接口数据
- 无需构建步骤，适合轻量级演示和教学场景

## 技术栈

- Vue 3
- Vue Router 4
- Pinia
- Vue I18n
- Axios
- vue3-sfc-loader

## 快速开始

由于项目中的 `.vue` 文件需要通过 HTTP 服务加载，请不要直接双击打开 `index.html`。

可以在项目根目录启动一个静态服务：

```bash
npx http-server
```

或使用 Python：

```bash
python -m http.server 8080
```

启动后在浏览器访问：

```txt
http://localhost:8080
```

## 目录结构

```txt
.
├── api/              # 模拟接口数据
├── assets/           # 静态资源与第三方库
├── components/       # 公共组件
├── directives/       # 自定义指令
├── i18n/             # 国际化配置
├── plugins/          # 插件注册
├── router/           # 路由配置
├── stores/           # Pinia 状态管理
├── utils/            # 工具方法
├── views/            # 页面组件
├── App.vue           # 根组件
├── config.js         # 项目配置
├── index.html        # 页面入口
└── main.js           # 应用入口
```

## 适用场景

- Vue 3 CDN 模式学习
- 无构建工具的前端原型开发
- Vue Router、Pinia、I18n 的基础集成示例
- 教学演示或轻量级静态项目模板

## 注意事项

- 本项目定位为 CDN 运行示例，不包含工程化构建流程。
- 生产项目建议使用 Vite 或其他现代构建工具管理依赖、构建和部署。
- 如果浏览器出现跨域或组件加载失败，请确认项目是通过 HTTP 服务访问。
