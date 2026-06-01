# Vue3 CDN App

这是一个不需要 Vite / webpack / npm build 的 Vue 3 CDN 示例项目。

## 技术

- Vue 3 CDN
- Vue Router 4 CDN
- vue3-sfc-loader
- `.vue` 单文件组件
- Hash 路由

## 启动

不要直接双击 `index.html`，请使用 HTTP 服务：

```bash
npx http-server
```

或：

```bash
python -m http.server 8080
```

然后打开：

```txt
http://localhost:8080
```

## 目录

```txt
index.html
main.js
App.vue
assets/
  css/
    global.css
router/
  index.js
store/
  index.js
utils/
  loader.js
  request.js
  utils.js
components/
  AppHeader.vue
  SideMenu.vue
  JobCard.vue
views/
  Home.vue
  JobList.vue
  JobDetail.vue
  NotFound.vue
api/
  mock.json
```
