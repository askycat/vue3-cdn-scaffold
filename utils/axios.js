/**
 * axios
 * https://github.com/axios/axios
 */
const axios = window.axios

// 全局 axios 默认值
axios.defaults.timeout = 500000
axios.defaults.baseURL = window.SITE_CONFIG?.baseURL || ''
axios.defaults.headers = {
    'Content-Type': 'application/json;'
}

// 防并发刷新标记与 Promise 容器
let isRefreshing = false
let refreshPromise = null
const TOKEN_REFRESH_WINDOW = 5 * 60 * 1000 // 5 分钟（毫秒）

// 免校验 Token 的接口白名单
const WHITE_LIST = [
    '/api/auth/login',   // 登录接口
    '/api/auth/logout',  // 登出接口
    '/api/auth/refresh'  // 刷新 Token 接口
]

function clearAuthSession() {
    const store = window.useAppInfoStore?.()
    if (store) store.logout()
}

function redirectToLogin() {
    const currentPath = window.location.hash
    if (currentPath.indexOf('#/login')>-1) return
    window.location.hash='#/login'
}

/**
 * 静默刷新 Token 方法
 */
async function refreshToken() {
    const oldToken = localStorage.getItem('token')
    try {
        // 使用原始 axios 发送请求，避免再次触发 request 拦截器导致死循环
        const res = await axios({
            method: 'post',
            url: '/api/auth/refresh', // 换取新 token 的接口地址，请根据实际接口调整
            headers: {
                'authorization': oldToken
            }
        })

        // 假设接口返回格式为：{ code: 0, data: { token: '...', expiresInHours: 10h } }
        if (res.data && res.data.code === 0) {
            const { token, expiresInHours } = res.data.data
            const store = window.useAppInfoStore?.()
            store?.setToken(token, expiresInHours)
            return token
        } else {
            throw new Error(res.data?.message)
        }
    } catch (error) {
        // 刷新失败，清空本地存储并跳转登录
        logout()
        return Promise.reject(error)
    } finally {
        isRefreshing = false
        refreshPromise = null
    }
}

// 添加请求拦截器：在发送请求前校验并在即将过期的 5 分钟内完成无感刷新
axios.interceptors.request.use(async function (config) {
    // 1. 排除白名单接口，直接放行
    const isWhiteListed = WHITE_LIST.some(path => config.url.includes(path))
    if (isWhiteListed) {
        return config
    }

    let token = localStorage.getItem('token')
    const expiresAt = Number(localStorage.getItem('token-expires-at')) || 0
    const now = Date.now()

    if (token) {
        // 计算 Token 距离过期的剩余毫秒数
        const timeRemaining = expiresAt - now

        if (timeRemaining >0 && timeRemaining <= TOKEN_REFRESH_WINDOW) {
            // 2. 未过期，但剩余时间 <= 5 分钟：前置静默刷新 Token
            
            // 防并发控制：如果已有请求在刷新中，直接等待其完成，不重复发起请求
            if (!isRefreshing) {
                isRefreshing = true
                refreshPromise = refreshToken()
            }
            
            // 等待刷新完成，拿到全新的 token
            token = await refreshPromise
        }
    }

    config.headers.authorization = token
    return config
}, function (error) {
    return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (!error.response) {
        // 无法连接服务器
    } else if (error.response.status === 0) {
        // 设备网络异常
    } else if (error.response.status === 401) {
        // 登录失效（如未过期但 Token 被服务端手动作废）
       logout()
    } else if (error.response.status === 403) {
        // 权限不足
    } else if (error.response.status === 404) {
        // 资源不存在
    } else if (error.response.status === 500) {
        // 服务器内部发生错误
    }

    return Promise.reject(error)
})

export default {
    async getAsync(url, params, options = {}) {
        const {
            autoHandleError = true
        } = options

        const res = await axios.get(url, { params })
        const data = res.data

        if (data.code != 0) {
            if (autoHandleError) {
               alert('统一处理失败:' + data.message)
               return Promise.reject(data) //中断链式调用并抛出异常
            }
        }

        return data
    },

    async postAsync(url, params, options = {}) {
        const {
            autoHandleError = true
        } = options

        const res = await axios.post(url, params)
        const data = res.data

        if (data.code != 0) {
            if (autoHandleError) {
                alert('统一处理失败:' + data.message)
                return Promise.reject(data) //中断链式调用并抛出异常
            }
        }

        return data
    },

    async downloadAsync(url, filename, params, method = 'get', options = {}) {
        const {
            autoHandleError = true
        } = options

        const response = await axios({
            method,
            url,
            data: method.toLowerCase() === 'post' ? params : undefined,
            params: method.toLowerCase() === 'get' ? params : undefined,
            responseType: 'blob'
        })

        if (!response || !response.data) {
            return
        }

        const data = response.data

        let fileName = filename

        if (!fileName) {
            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition']

            if (contentDisposition) {
                const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?([^;'"\n]*)/i)

                if (match && match[1]) {
                    fileName = decodeURIComponent(match[1].replace(/['"]/g, ''))
                }
            }
        }

        if (!fileName) {
            const urlParts = url.split('/')
            const lastPart = urlParts[urlParts.length - 1].split('?')[0]
            fileName = lastPart || 'download'
        }

        const blobUrl = window.URL.createObjectURL(new Blob([response.data]))
        const link = window.document.createElement('a')

        link.style.display = 'none'
        link.href = blobUrl
        link.setAttribute('download', fileName)

        window.document.body.appendChild(link)
        link.click()

        window.document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl)

        return response
    }
}