<template>
  <!-- 使用 MobileLayout 移动端主框组件 -->
  <MobileLayout>
    <!-- 顶部导航栏插槽：动态绑定属性以响应组件实验室的配置 -->
    <template #header>
      <MobileNavBar
        :title="currentTitle"
        :left-arrow="activeTab !== 'menu' && navConfig.leftArrow"
        :left-text="activeTab === 'menu' ? '返回主页' : '返回目录'"
        :right-text="navConfig.rightText"
        @click-left="onNavLeftClick"
        @click-right="openMenu"
        :class="{ 'highlight-header': showSafeAreaHighlight }"
      />
    </template>

    <!-- 默认主内容滚动区域 -->
    <div class="demo-page-wrapper" :class="{ 'highlight-body': showSafeAreaHighlight }">
      
      <!-- 页面 0: 中间导航目录页 (menu) -->
      <div v-if="activeTab === 'menu'" class="tab-pane menu-pane">
        <!-- 头部欢迎公告 -->
        <div class="welcome-banner">
          <h4>📱 移动端布局沙盒 (Menu)</h4>
          <p>本示例用于展示自适应全面屏、安全区（Notch 刘海屏与底部手势条）的组件化排版。请选择以下任意案例开始体验：</p>
        </div>

        <MobileCard title="🎯 应用与功能示例">
          <div class="showcase-menu-list">
            <div class="showcase-item" @click="activeTab = 'dashboard'">
              <div class="showcase-icon">📊</div>
              <div class="showcase-info">
                <div class="showcase-title">系统数据看板 (Dashboard)</div>
                <div class="showcase-desc">包含模拟流量折线图与统计指标卡片</div>
              </div>
              <div class="showcase-arrow">➔</div>
            </div>

            <div class="showcase-item" @click="activeTab = 'message'">
              <div class="showcase-icon">💬</div>
              <div class="showcase-info">
                <div class="showcase-title">会话信息中心 (Message)</div>
                <div class="showcase-desc">iOS 沉浸式风格会话列表，支持弹窗反馈</div>
              </div>
              <div class="showcase-arrow">➔</div>
            </div>

            <div class="showcase-item" @click="activeTab = 'profile'">
              <div class="showcase-icon">👤</div>
              <div class="showcase-info">
                <div class="showcase-title">个人信息设置 (Profile)</div>
                <div class="showcase-desc">包括快捷功能菜单与脚手架内核参数</div>
              </div>
              <div class="showcase-arrow">➔</div>
            </div>
          </div>
        </MobileCard>

        <MobileCard title="🧪 核心组件配置与实时调试">
          <div class="showcase-menu-list">
            <div class="showcase-item highlight-item" @click="activeTab = 'playground'">
              <div class="showcase-icon">⚡</div>
              <div class="showcase-info">
                <div class="showcase-title">组件配置实验室 (Playground)</div>
                <div class="showcase-desc">可视化高亮安全区，动态调节组件属性</div>
              </div>
              <div class="showcase-arrow">➔</div>
            </div>
          </div>
        </MobileCard>
      </div>

      <!-- 页面 A: 数据报表 (dashboard) -->
      <div v-if="activeTab === 'dashboard'" class="tab-pane">
        <div class="welcome-banner">
          <h4>👋 移动端自适应应用演示</h4>
          <p>当前页面限制为最大 480px 居中（手机框视感），在手机端会自动 100% 满屏展示。</p>
        </div>

        <MobileCard title="📈 流量趋势" action-text="刷新" @click-action="refreshStats">
          <div class="chart-mock-container">
            <div class="chart-bar-item" v-for="(val, index) in chartValues" :key="index">
              <div class="bar-fill" :style="{ height: val + 'px' }"></div>
              <span class="bar-label">周{{ index + 1 }}</span>
            </div>
          </div>
          <div class="stats-footer">
            <span>总访问: <strong>14,820</strong></span>
            <span class="trend-up">同比: +15.4% ↑</span>
          </div>
        </MobileCard>

        <MobileCard title="🧩 已挂载的布局组件">
          <ul class="component-list">
            <li><strong>MobileLayout</strong>: 提供视口与安全区适配骨架</li>
            <li><strong>MobileNavBar</strong>: 仿 iOS 原生置顶导航条</li>
            <li><strong>MobileTabBar</strong>: 玻璃滤镜底部选项卡</li>
            <li><strong>MobileCard</strong>: 内容包装与交互面板</li>
          </ul>
        </MobileCard>
      </div>

      <!-- 页面 B: 会话信息 (message) -->
      <div v-if="activeTab === 'message'" class="tab-pane">
        <MobileCard title="💬 我的消息列表">
          <div class="msg-item" v-for="msg in messages" :key="msg.id" @click="viewMessage(msg)">
            <div class="msg-avatar" :style="{ backgroundColor: msg.color }">{{ msg.sender[0] }}</div>
            <div class="msg-body">
              <div class="msg-top">
                <span class="msg-sender">{{ msg.sender }}</span>
                <span class="msg-time">{{ msg.time }}</span>
              </div>
              <p class="msg-summary">{{ msg.content }}</p>
            </div>
          </div>
        </MobileCard>
      </div>

      <!-- 页面 C: 个人配置 (profile) -->
      <div v-if="activeTab === 'profile'" class="tab-pane">
        <div class="profile-header-card">
          <div class="profile-avatar">U</div>
          <div class="profile-info">
            <h3>游客用户</h3>
            <p>系统角色: 普通体验者</p>
          </div>
        </div>

        <MobileCard title="🛠️ 快捷功能面板">
          <div class="grid-actions">
            <div class="grid-action-item" @click="triggerAction('多语言切换')">
              <span class="action-icon">🌐</span>
              <span class="action-name">语言切换</span>
            </div>
            <div class="grid-action-item" @click="triggerAction('清除缓存')">
              <span class="action-icon">🧹</span>
              <span class="action-name">清除缓存</span>
            </div>
            <div class="grid-action-item" @click="triggerAction('系统重置')">
              <span class="action-icon">🔄</span>
              <span class="action-name">系统重置</span>
            </div>
          </div>
        </MobileCard>

        <MobileCard title="ℹ️ 运行状态">
          <div class="info-row">
            <span>基础核心</span>
            <span>Vue 3.x CDN + ESM</span>
          </div>
          <div class="info-row">
            <span>路由模式</span>
            <span>Hash History</span>
          </div>
          <div class="info-row">
            <span>运行渲染</span>
            <span>vue3-sfc-loader</span>
          </div>
        </MobileCard>
      </div>

      <!-- 页面 D: 组件配置实验室 (playground) -->
      <div v-if="activeTab === 'playground'" class="tab-pane">
        <div class="welcome-banner" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);">
          <h4>🧪 布局组件实验室</h4>
          <p>在此动态配置各个组件属性，页面顶部与卡片均会提供实时的视觉反馈。</p>
        </div>

        <!-- Layout 体验 -->
        <MobileCard title="🎯 MobileLayout 视口安全区">
          <p class="demo-pane-desc">高亮显示全面屏的物理安全边界，模拟安全槽范围：</p>
          <div class="btn-group">
            <button class="btn btn-primary" @click="toggleSafeAreaHighlight">
              {{ showSafeAreaHighlight ? '关闭安全区高亮' : '开启安全区高亮' }}
            </button>
          </div>
          <div class="safe-area-legend" v-if="showSafeAreaHighlight">
            <span class="legend-item header-lg">■ 头部安全区插槽 (Header Slot)</span>
            <span class="legend-item default-lg">■ 内容自适应区域 (Default Slot)</span>
            <span class="legend-item footer-lg">■ 底部安全区插槽 (Footer Slot)</span>
          </div>
        </MobileCard>

        <!-- NavBar 体验 -->
        <MobileCard title="⚙️ 自定义 MobileNavBar 导航栏">
          <p class="demo-pane-desc">实时修改顶部导航栏的属性，观察上方栏目变化：</p>
          <div class="control-grid">
            <div class="control-item">
              <label>导航标题</label>
              <input type="text" v-model="navConfig.title" />
            </div>
            <div class="control-item-row">
              <label>
                <input type="checkbox" v-model="navConfig.leftArrow" /> 显示返回箭头
              </label>
            </div>
            <div class="control-item">
              <label>左侧文字</label>
              <input type="text" v-model="navConfig.leftText" />
            </div>
            <div class="control-item">
              <label>右侧文字</label>
              <input type="text" v-model="navConfig.rightText" />
            </div>
          </div>
        </MobileCard>

        <!-- Card 体验 -->
        <MobileCard title="✨ MobileCard 包装面板特效">
          <p class="demo-pane-desc">体验带有渐变流水边框和折叠面板的 Card 组件高级样式：</p>
          
          <MobileCard 
            :title="cardConfig.glow ? '🔥 极光流水边框卡片' : '⚡ 普通交互卡片'" 
            :class="{ 'glow-card-active': cardConfig.glow }"
            :action-text="cardConfig.collapsed ? '展开' : '收起'" 
            @click-action="cardConfig.collapsed = !cardConfig.collapsed"
          >
            <div class="card-demo-settings">
              <label class="toggle-switch">
                <input type="checkbox" v-model="cardConfig.glow" /> 开启极光流水发光边框
              </label>
            </div>
            <transition name="collapse">
              <div v-show="!cardConfig.collapsed" class="card-collapsible-content">
                <p>这是一个可以通过点击右上角动作按钮进行折叠/展开的内容面板。当开启极光发光后，卡片四角呈现流动流光，大幅增强科技感。</p>
              </div>
            </transition>
          </MobileCard>
        </MobileCard>
      </div>

    </div>

    <!-- 底部固定导航选项卡插槽 -->
    <template #footer>
      <MobileTabBar v-slot:default v-model="activeTab" :items="tabItems" :class="{ 'highlight-footer': showSafeAreaHighlight }" />
    </template>
  </MobileLayout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'MobileDemo'
})

const router = useRouter()

// 标签页状态：默认为 'menu' 导航目录页
const activeTab = ref('menu')
const tabItems = [
  { id: 'menu', label: '目录', icon: '📱' },
  { id: 'dashboard', label: '工作台', icon: '📊' },
  { id: 'message', label: '会话', icon: '💬' },
  { id: 'playground', label: '实验室', icon: '🛠️' }
]

// 导航配置属性，支持在实验室中进行实时编辑
const navConfig = ref({
  title: '',
  leftArrow: true,
  leftText: '返回主页',
  rightText: '菜单'
})

// 返回主文档首页
function goBack() {
  router.push('/home')
}

// 右上角菜单动作
function openMenu() {
  alert('✨ 触发了右上角主菜单！')
}

// 导航栏动作
function onNavLeftClick() {
  if (activeTab.value === 'menu') {
    goBack()
  } else {
    activeTab.value = 'menu'
  }
}

// 动态计算导航条标题
const currentTitle = computed(() => {
  if (activeTab.value === 'playground') {
    return navConfig.value.title || '实验室'
  }
  switch (activeTab.value) {
    case 'menu':
      return '示例导航目录'
    case 'dashboard':
      return '数据中心'
    case 'message':
      return '会话中心'
    case 'profile':
      return '个人设置'
    default:
      return '移动端页面'
  }
})

// 监听活动标签页，自动同步导航栏默认标题
watch(activeTab, (newTab) => {
  if (newTab === 'dashboard') navConfig.value.title = '数据中心'
  else if (newTab === 'message') navConfig.value.title = '会话中心'
  else if (newTab === 'profile') navConfig.value.title = '个人设置'
  else if (newTab === 'playground') navConfig.value.title = '实验室'
  else if (newTab === 'menu') navConfig.value.title = '示例导航目录'
})

// 模拟数据看板流量图表
const chartValues = ref([45, 65, 35, 80, 50, 70, 90])
function refreshStats() {
  chartValues.value = chartValues.value.map(() => Math.floor(Math.random() * 70) + 25)
}

// 模拟消息列表数据
const messages = ref([
  { id: 1, sender: '系统助手', content: '欢迎体验免打包极简框架！', time: '10:30', color: '#0ea5e9' },
  { id: 2, sender: '技术支持', content: '已全局挂载路由及状态持久化插件。', time: '昨日', color: '#10b981' },
  { id: 3, sender: '编译工具', content: 'langs.csv 翻译转换成功。', time: '周三', color: '#f59e0b' }
])

function viewMessage(msg) {
  alert(`💬 查看来自【${msg.sender}】的消息详情：\n"${msg.content}"`)
}

function triggerAction(name) {
  alert(`⚡ 在移动面板中执行了：${name}`)
}

// 实验室特殊状态
const showSafeAreaHighlight = ref(false)
function toggleSafeAreaHighlight() {
  showSafeAreaHighlight.value = !showSafeAreaHighlight.value
}

const cardConfig = ref({
  glow: false,
  collapsed: false
})
</script>

<style scoped>
.demo-page-wrapper {
  padding-bottom: 24px;
}

/* 欢迎公告板 */
.welcome-banner {
  background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%);
  margin: 16px;
  padding: 18px;
  border-radius: 12px;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(13, 148, 136, 0.15);
}

.welcome-banner h4 {
  margin: 0 0 6px 0;
  font-size: 14.5px;
  font-weight: 800;
}

.welcome-banner p {
  margin: 0;
  font-size: 11.5px;
  line-height: 1.5;
  opacity: 0.9;
}

/* 中间导航目录项样式 */
.showcase-menu-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.showcase-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.showcase-item:hover, .showcase-item:active {
  background: #f0fdfa;
  border-color: #99f6e4;
  transform: translateY(-1.5px);
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.05);
}

.highlight-item {
  border-color: #2dd4bf;
  background: linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%);
}

.showcase-icon {
  font-size: 20px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.showcase-info {
  flex-grow: 1;
  min-width: 0;
}

.showcase-title {
  font-size: 13.5px;
  font-weight: 750;
  color: #0f172a;
  margin-bottom: 2px;
}

.showcase-desc {
  font-size: 11px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.showcase-arrow {
  font-size: 11px;
  font-weight: bold;
  color: #0d9488;
  margin-left: 8px;
}

/* 模拟柱状图 */
.chart-mock-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 110px;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 8px;
  margin-top: 10px;
}

.chart-bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
}

.bar-fill {
  width: 22px;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(to top, #0d9488, #2dd4bf);
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bar-label {
  font-size: 10px;
  color: #94a3b8;
  margin-top: 6px;
  font-weight: 600;
}

.stats-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-top: 12px;
  color: #475569;
}

.trend-up {
  color: #10b981;
  font-weight: 700;
}

/* 组件列表 */
.component-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  color: #475569;
}

.component-list li {
  margin-bottom: 8px;
}

.component-list li:last-child {
  margin-bottom: 0;
}

/* 消息列表 */
.msg-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: background 0.2s;
}

.msg-item:last-child {
  border-bottom: none;
}

.msg-item:active {
  background-color: #f8fafc;
}

.msg-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 15px;
  flex-shrink: 0;
}

.msg-body {
  flex-grow: 1;
  margin-left: 12px;
  min-width: 0;
}

.msg-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.msg-sender {
  font-size: 13.5px;
  font-weight: 700;
  color: #0f172a;
}

.msg-time {
  font-size: 10px;
  color: #94a3b8;
}

.msg-summary {
  margin: 0;
  font-size: 11.5px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 个人中心头部 */
.profile-header-card {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  padding: 16px;
  margin: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.01);
}

.profile-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #0d9488;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
}

.profile-info {
  margin-left: 14px;
}

.profile-info h3 {
  margin: 0 0 4px 0;
  font-size: 15px;
  color: #0f172a;
}

.profile-info p {
  margin: 0;
  font-size: 11px;
  color: #64748b;
}

/* 宫格快捷动作 */
.grid-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  text-align: center;
}

.grid-action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  cursor: pointer;
  background-color: #f8fafc;
  transition: all 0.2s;
}

.grid-action-item:active {
  background-color: #f0fdfa;
  border-color: #2dd4bf;
}

.action-icon {
  font-size: 20px;
  margin-bottom: 6px;
}

.action-name {
  font-size: 11.5px;
  font-weight: 600;
  color: #334155;
}

/* 详细参数行 */
.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row span:last-child {
  font-weight: 600;
  color: #334155;
}

/* 实验室调试样式 */
.demo-pane-desc {
  font-size: 12.5px;
  color: #475569;
  line-height: 1.5;
  margin: 0 0 12px 0;
}

.btn-group {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%);
  color: #ffffff;
}

.btn-primary:active {
  transform: scale(0.97);
}

.safe-area-legend {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
}

.legend-item {
  font-size: 10px;
  font-weight: bold;
}

.header-lg { color: #0ea5e9; }
.default-lg { color: #10b981; }
.footer-lg { color: #f43f5e; }

/* 调试高亮框效果 */
.highlight-header {
  outline: 3px dashed rgba(14, 165, 233, 0.8) !important;
  background-color: rgba(14, 165, 233, 0.15) !important;
  position: relative;
}
.highlight-header::after {
  content: "Header Slot (顶部安全区)";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(14, 165, 233, 0.95);
  color: #fff;
  font-size: 9px;
  padding: 2px 4px;
  border-radius: 4px;
  z-index: 100;
  pointer-events: none;
  font-weight: bold;
  white-space: nowrap;
}

.highlight-body {
  outline: 3px dashed rgba(16, 185, 129, 0.8) !important;
  background-color: rgba(16, 185, 129, 0.05) !important;
  position: relative;
}
.highlight-body::before {
  content: "Body Slot (主滚动内容视口)";
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(16, 185, 129, 0.95);
  color: #fff;
  font-size: 9px;
  padding: 2px 4px;
  border-radius: 4px;
  z-index: 100;
  pointer-events: none;
  font-weight: bold;
  white-space: nowrap;
}

.highlight-footer {
  outline: 3px dashed rgba(244, 63, 94, 0.8) !important;
  background-color: rgba(244, 63, 94, 0.15) !important;
  position: relative;
}
.highlight-footer::after {
  content: "Footer Slot (底部安全区)";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(244, 63, 94, 0.95);
  color: #fff;
  font-size: 9px;
  padding: 2px 4px;
  border-radius: 4px;
  z-index: 100;
  pointer-events: none;
  font-weight: bold;
  white-space: nowrap;
}

/* 控制台表单 */
.control-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.control-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.control-item-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 4px 0;
}

.control-item label, .control-item-row label {
  font-size: 11.5px;
  font-weight: 700;
  color: #475569;
}

.control-item input[type="text"] {
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 12px;
}

.control-item input[type="text"]:focus {
  outline: none;
  border-color: #2dd4bf;
}

/* 极光流水发光卡片效果 */
.glow-card-active {
  position: relative;
  overflow: hidden;
  border-color: transparent !important;
}

.glow-card-active::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent 20%,
    #0d9488 40%,
    #0ea5e9 60%,
    transparent 80%
  );
  animation: rotateGlow 3s linear infinite;
  z-index: 0;
  pointer-events: none;
}

.glow-card-active::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: #fff;
  border-radius: 10px;
  z-index: 0;
  pointer-events: none;
}

/* 确保内部插槽内容能高居在极光流水背景层之上 */
.glow-card-active > * {
  position: relative;
  z-index: 1;
}

@keyframes rotateGlow {
  100% {
    transform: rotate(360deg);
  }
}

.card-collapsible-content {
  padding-top: 10px;
  font-size: 12px;
  color: #475569;
  line-height: 1.5;
  border-top: 1px dashed #f1f5f9;
  margin-top: 10px;
}

.card-demo-settings {
  margin-bottom: 10px;
}

.toggle-switch {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: #475569;
}

/* 动效 */
.collapse-enter-active, .collapse-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: 100px;
  overflow: hidden;
}
.collapse-enter-from, .collapse-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
