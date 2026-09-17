// 旧版本曾单独写入 token / token-expires-at；现在统一收敛到 Pinia persisted 的 app 键。
localStorage.removeItem('token')
localStorage.removeItem('token-expires-at')

window.useAppStore = Pinia.defineStore('app', {
  persist: true,

  state: () => ({
    token: '',
    tokenExpiresAt: 0, // Token 过期时间戳
    userInfo: null,
    permissions: [], // 拥有的权限列表，例如：['user-add', 'user-edit']
    menus: [],                 // 路由与 KeepAlive 组件名称映射
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    // 检查是否拥有某项权限
    hasPermission: (state) => (permission) => {
      return state.permissions.includes(permission)
    },
    getRoutes(state) {
      const routes = []

      function addRoutes(nodes) {
        for (const node of nodes) {
          if (node.type === 1) {
            routes.push({
              path: node.path,
              name: `permission-${node.id}`,
              component: node.component,
              meta: {
                title: node.name,
                auth: true,
                layout: 'admin',
                keepAliveName: node.component.split('/').pop().replace(/\.vue$/i, '')
              }
            })
          }

          addRoutes(node.children)
        }
      }

      addRoutes(state.menus)
      return routes
    }
   },

  actions: {
    // 设置 Token
    setToken(token, expiresInHours = 12) {
      this.token = token
      this.tokenExpiresAt = token ? Date.now() + Number(expiresInHours) * 60 * 60 * 1000 : 0
    },
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    // 设置权限列表
    setPermissions(permissions) {
      this.permissions = permissions
    },
    // 加载应用信息（站点信息、用户信息、权限列表、菜单等）
    load() {
      return window.http.getAsync('/App/AppInfo').then(({ data }) => {
        this.site = data.site
        document.title = data.site.title
        const favicon = document.querySelector('link[rel="icon"]')
        if (favicon) {
          favicon.href = data.site.favicon || './favicon.ico'
          favicon.removeAttribute('type')
        }
        this.settings = data.settings
        this.userInfo = data.user
        this.permissions = []

        const getMenus = nodes => {
          const menus = []

          for (const node of nodes) {
            if (node.type === 2) {
              this.permissions.push(node.code)
              continue
            }

            if (node.path !== '/dashboard') {
              menus.push({ ...node, children: getMenus(node.children) })
            }
          }

          return menus
        }

        this.menus = getMenus(data.menus)
        window.registerPermissionRoutes(this.getRoutes)
      })
    },
    // 清除登录状态
    logout() {
      this.token = ''
      this.tokenExpiresAt = 0
      this.userInfo = null
      this.permissions = []
      window.resetPermissionRoutes?.()
    }
  }
})
