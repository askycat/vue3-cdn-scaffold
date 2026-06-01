window.useAppInfoStore = Pinia.defineStore('appInfo', {
  persist: true,

  state: () => ({
    token: '',
    userInfo: null,
    permissions: [] // 拥有的权限列表，例如：['user', 'admin']
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    // 检查是否拥有某项权限
    hasPermission: (state) => (permission) => {
      return state.permissions.includes(permission)
    }
  },

  actions: {
    // 设置 Token
    setToken(token) {
      this.token = token
    },
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    // 设置权限列表
    setPermissions(permissions) {
      this.permissions = permissions
    },
    // 清除登录状态
    logout() {
      this.token = ''
      this.userInfo = null
      this.permissions = []
    }
  }
})
