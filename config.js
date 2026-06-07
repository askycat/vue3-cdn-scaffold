// 站点所有信息的全局变量配置
window.SITE_CONFIG = {
  title: 'Vue3 CDN Scaffold', // 站点标题，用于页面 title 等展示。
  description: '基于原生 Vue 3 CDN + ESM，免编译、零打包、开箱即用的极简前端开发脚手架。本文档详细介绍了项目中集成的核心模块及其具体用法。',
  copyright: 'Copyright © 2026', // 版权信息，用于页脚展示。
  baseURL: '', // 接口请求基础路径。
  version: '1.0.0(2026-06-01)', // 站点版本号，方便展示或排查当前发布版本。
  remCssVersion: '202606021', // rem CSS 版本号，拼接到样式 URL 后用于控制浏览器缓存更新。
  remCssUrls: [               // 需要运行时转换 px -> rem 的全局样式表。
    './assets/css/global.css'
  ], 
  openPxToRem: false, // 是否开启运行时 px -> rem 转换。
  pxToRemBase: 16, // px 转 rem 的换算基准，16px = 1rem。
  designWidth: 390, // 设计稿宽度，用于按视口比例计算 html 根字号。
  minRootFontSize: 14, // html 根字号最小值，避免小屏字号过小。
  maxRootFontSize: 36, // html 根字号最大值，避免大屏字号过大。
};
