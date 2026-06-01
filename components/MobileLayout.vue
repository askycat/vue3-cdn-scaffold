<template>
  <div class="mobile-layout-wrapper">
    <div class="mobile-layout-container">
      <!-- 顶部固定区域 -->
      <header v-if="$slots.header" class="mobile-layout-header">
        <slot name="header"></slot>
      </header>

      <!-- 主滚动内容区域 -->
      <main class="mobile-layout-body">
        <slot></slot>
      </main>

      <!-- 底部固定区域 -->
      <footer v-if="$slots.footer" class="mobile-layout-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileLayout'
}
</script>

<style scoped>
/* 最外层包装器：在桌面端居中并模拟手机预览框 */
.mobile-layout-wrapper {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #f1f5f9; /* 外部底色 */
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

/* 核心容器：限制最大宽度为 480px，锁定满高 100vh */
.mobile-layout-container {
  width: 100%;
  max-width: 480px;
  height: 100vh;
  height: 100dvh;
  background-color: #f8fafc; /* 手机内底色 */
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08); /* 桌面端手机框微阴影 */
  border-left: 1px solid rgba(226, 232, 240, 0.8);
  border-right: 1px solid rgba(226, 232, 240, 0.8);
  box-sizing: border-box;
}

/* 顶部固定区域：适配 iOS 刘海安全区 */
.mobile-layout-header {
  flex-shrink: 0;
  width: 100%;
  background-color: #ffffff;
  padding-top: env(safe-area-inset-top, 0px);
  z-index: 10;
  border-bottom: 1px solid rgba(241, 245, 249, 0.8);
}

/* 主内容区域：纵向滚动，隐藏滚动条 */
.mobile-layout-body {
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  /* 隐藏 Firefox & Edge & Webkit 滚动条，实现原生 App 视感 */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.mobile-layout-body::-webkit-scrollbar {
  display: none;
}

/* 底部固定区域：适配 iOS 底部小黑条安全区 */
.mobile-layout-footer {
  flex-shrink: 0;
  width: 100%;
  background-color: #ffffff;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  z-index: 10;
  border-top: 1px solid rgba(241, 245, 249, 0.8);
}

/* 当屏幕小于 480px 时（即在真实手机访问下），去除桌面端的边框与阴影，占满全屏 */
@media (max-width: 480px) {
  .mobile-layout-container {
    max-width: 100%;
    border-left: none;
    border-right: none;
    box-shadow: none;
  }
}
</style>
