<template>
  <div class="mobile-tab-bar">
    <div
      v-for="item in items"
      :key="item.id"
      class="tab-item"
      :class="{ 'tab-item-active': modelValue === item.id }"
      @click="onSelect(item.id)"
    >
      <!-- 渲染图标（可以是 Emoji，也可以由外部槽自定义） -->
      <div class="tab-icon">
        <slot :name="'icon-' + item.id" :active="modelValue === item.id">
          {{ item.icon }}
        </slot>
      </div>

      <!-- 渲染文本标签 -->
      <span class="tab-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileTabBar',
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    function onSelect(id) {
      if (props.modelValue !== id) {
        emit('update:modelValue', id)
        emit('change', id)
      }
    }

    return {
      onSelect
    }
  }
}
</script>

<style scoped>
.mobile-tab-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 52px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  user-select: none;
  box-sizing: border-box;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  cursor: pointer;
  color: #64748b; /* 未激活状态字色 */
  transition: color 0.2s ease, transform 0.1s ease;
}

.tab-item:active {
  transform: scale(0.96);
}

.tab-icon {
  font-size: 18px;
  margin-bottom: 2px;
  transition: transform 0.2s ease;
}

.tab-item-active .tab-icon {
  transform: translateY(-1px);
}

.tab-label {
  font-size: 10.5px;
  font-weight: 600;
}

/* 激活状态下的颜色（品牌色） */
.tab-item-active {
  color: #0d9488;
}
</style>
