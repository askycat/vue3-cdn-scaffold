window.useAppStore = Pinia.defineStore('app', {
  persist: true,

  state: () => ({
    token: '',
    tokenExpiresAt: 0, // Token 过期时间戳
    userInfo: null,
    permissions: [] // 拥有的权限列表，例如：['user-add', 'user-edit']
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
    setToken(token, expiresInHours = 12) {
      this.token = token
      this.tokenExpiresAt = token ? Date.now() + Number(expiresInHours) * 60 * 60 * 1000 : 0

      if (token) {
        localStorage.setItem('token', token)
        localStorage.setItem('token-expires-at', this.tokenExpiresAt)
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('token-expires-at')
      }
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
      this.tokenExpiresAt = 0
      this.userInfo = null
      this.permissions = []
      localStorage.removeItem('token')
      localStorage.removeItem('token-expires-at')
    }
  }
})
