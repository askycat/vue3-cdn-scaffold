const fs = require('fs')
const path = require('path')

const libsDir = __dirname
const outputFile = path.join(libsDir, 'vendor.min.js')

// 第三方库合并顺序：先加载 Vue 生态基础库，再加载功能库。
const files = [
  'vue.global.prod.js',
  'vue-demi.iife.js',
  'vue-router.global.js',
  'vue-i18n.global.prod.js',
  'pinia.iife.js',
  'pinia-plugin-persistedstate.js',
  'axios.min.js',
  'vue3-sfc-loader.js'
]

const vendorCode = files.map(file => {
  const filePath = path.join(libsDir, file)

  if (!fs.existsSync(filePath)) {
    throw new Error(`缺少依赖文件：${file}`)
  }

  return fs.readFileSync(filePath, 'utf8')
}).join('\n;\n')

fs.writeFileSync(outputFile, vendorCode, 'utf8')

console.log(`已合并 ${files.length} 个库到 ${path.relative(process.cwd(), outputFile)}`)
