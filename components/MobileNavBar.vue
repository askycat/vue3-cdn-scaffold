<template>
  <div class="mobile-nav-bar">
    <!-- 左侧返回或自定义按钮区域 -->
    <div class="nav-bar-left" @click="onClickLeft">
      <slot name="left">
        <span v-if="leftArrow" class="back-arrow-icon">
          <svg viewBox="0 0 1024 1024" class="svg-arrow">
            <path d="M687.4 165.7c14.6 10.1 18.2 30.1 8 44.6l-377.7 262.4 377.7 262.4c14.6 10.1 18.2 30.1 8 44.6-10.1 14.6-30.1 18.2-44.6 8L225 534.3c-14.6-10.1-14.6-34.6 0-44.7l418.1-290.6c14.6-10.1 34.6-6.5 44.6 8.1z" fill="currentColor"></path>
          </svg>
        </span>
        <span v-if="leftText" class="nav-bar-text">{{ leftText }}</span>
      </slot>
    </div>

    <!-- 中间标题区域 -->
    <div class="nav-bar-title">
      <slot name="title">
        <span class="title-text">{{ title }}</span>
      </slot>
    </div>

    <!-- 右侧动作按钮区域 -->
    <div class="nav-bar-right" @click="onClickRight">
      <slot name="right">
        <span v-if="rightText" class="nav-bar-text right-action-text">{{ rightText }}</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileNavBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    leftText: {
      type: String,
      default: ''
    },
    leftArrow: {
      type: Boolean,
      default: false
    },
    rightText: {
      type: String,
      default: ''
    }
  },
  emits: ['click-left', 'click-right'],
  setup(props, { emit }) {
    function onClickLeft(event) {
      emit('click-left', event)
    }

    function onClickRight(event) {
      emit('click-right', event)
    }

    return {
      onClickLeft,
      onClickRight
    }
  }
}
</script>

<style scoped>
.mobile-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  position: relative;
  background-color: #ffffff;
  user-select: none;
  box-sizing: border-box;
}

.nav-bar-left,
.nav-bar-right {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  cursor: pointer;
  z-index: 1;
}

.nav-bar-left:active,
.nav-bar-right:active {
  opacity: 0.6;
}

.back-arrow-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  margin-right: 4px;
}

.svg-arrow {
  width: 20px;
  height: 20px;
}

.nav-bar-text {
  font-size: 14.5px;
  color: #0f172a;
  font-weight: 500;
}

.right-action-text {
  color: #0d9488; /* 右边按钮采用品牌主色 */
  font-weight: 600;
}

.nav-bar-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 60%;
  text-align: center;
}

.title-text {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
