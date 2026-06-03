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

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers.authorization = localStorage.getItem('token')
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
        // 登录失效
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
                throw data
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