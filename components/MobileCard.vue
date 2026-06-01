<template>
  <div class="mobile-card">
    <!-- 卡片头部：支持标题和右侧动作 -->
    <div v-if="title || actionText || $slots.header" class="card-header">
      <slot name="header">
        <h3 class="card-title">{{ title }}</h3>
        <span v-if="actionText" class="card-action-btn" @click="onActionClick">
          {{ actionText }}
        </span>
      </slot>
    </div>

    <!-- 卡片内容区域 -->
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    actionText: {
      type: String,
      default: ''
    }
  },
  emits: ['click-action'],
  setup(props, { emit }) {
    function onActionClick(event) {
      emit('click-action', event)
    }

    return {
      onActionClick
    }
  }
}
</script>

<style scoped>
.mobile-card {
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  margin: 12px 16px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.01), 0 2px 8px rgba(15, 23, 42, 0.01);
  box-sizing: border-box;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 移动端卡片微小的悬浮上移质感 */
.mobile-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.03);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px dashed rgba(241, 245, 249, 0.8);
}

.card-title {
  margin: 0;
  font-size: 14.5px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.01em;
}

.card-action-btn {
  font-size: 12px;
  font-weight: 600;
  color: #0d9488; /* 使用统一的品牌色 */
  cursor: pointer;
  padding: 2px 4px;
}

.card-action-btn:active {
  opacity: 0.6;
}

.card-content {
  font-size: 13.5px;
  color: #475569;
  line-height: 1.5;
}
</style>
