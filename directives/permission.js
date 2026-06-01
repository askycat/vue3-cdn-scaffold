function checkPermission(el, binding) {
  // 从全局 Pinia appInfo store 获取持有的权限列表
  const userStore = useAppInfoStore()
  const permissions = userStore.permissions || []

  // 此操作需要的权限 (支持 v-permission="'user'" 字符串值，或 v-permission:user 冒号参数)
  let permission = binding.value
  if (permission === undefined && binding.arg) {
    permission = binding.arg
  }

  // 比对权限是否吻合，若不吻合则隐藏元素，吻合则恢复显示
  if (!permissions.includes(permission)) {
    el.style.display = 'none'
  } else {
    el.style.display = ''
  }
}

export default {
  // 首次挂载时校验
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // // 状态更新时校验（实现无刷实时响应权限切换）
  // updated(el, binding) {
  //   checkPermission(el, binding)
  // }
}