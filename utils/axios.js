/**
 * axios
 * https://github.com/axios/axios
 */
const axios = window.axios

// 全局 axios 默认值
axios.defaults.timeout = 500000
axios.defaults.baseURL =  window.SITE_INFO?.baseURL2 || ''
axios.defaults.headers = {
    'Content-Type': 'application/json;'
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.authorization = localStorage.getItem("token")
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (!error.response) {
        //无法连接服务器
    }else if (error.response.status === 0) {
        //设备网络异常
    }else if (error.response.status === 401) {
        //登录失效
    } else if (error.response.status === 403) {
        //权限不足
    } else if (error.response.status === 404) {
        //资源不存在
    } else if (error.response.status === 500) {
        //服务器内部发生错误
    }
    return Promise.reject(error);
});


export default {
    getAsync(url, params, errorCallBack = null) {
        return new Promise((resovle, reject) => {
            axios.get(url, {
                params: params
            }).then(res => {
                if (res.data.code != 0) {
                    //neo.closeLoading();
                    if (!errorCallBack) {
                        //neo.closeLoading();
                        //neo.warning(res.data.msg);
                    }
                    else
                        errorCallBack(res.data)
                } else {
                    resovle(res.data)
                }
            }).catch(error => {
                reject(error.data)
            })
        })
    },
    postAsync(url, params, errorCallBack = null) {
        return new Promise((resovle, reject) => {
            axios.post(url, params).then(res => {
                if (res.data.code != 0) {
                    neo.closeLoading();
                    if (!errorCallBack) {
                        neo.closeLoading();
                        neo.warning(res.data.msg);
                    }
                    else
                        errorCallBack(res.data)
                } else {
                    resovle(res.data)
                }

            }).catch(error => {
                reject(error.data)
            })
        })
    },
    downloadAsync(url, params, filename, method = 'post') {
        axios({
            method: method,
            url: url,
            data: method.toLowerCase() === 'post' ? params : undefined,
            params: method.toLowerCase() === 'get' ? params : undefined,
            responseType: 'blob'
        }).then(response => {
            if (!response || !response.data) {
                return
            }

            // 1. 安全获取文件名
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

            // 2. 兜底文件名：如果仍然没有，则从 URL 中截取，或使用默认名称
            if (!fileName) {
                const urlParts = url.split('/')
                const lastPart = urlParts[urlParts.length - 1].split('?')[0]
                fileName = lastPart || 'download'
            }

            // 3. 避免变量遮蔽，创建 Blob URL 并下载
            const blobUrl = window.URL.createObjectURL(new Blob([response.data]))
            const link = window.document.createElement('a')
            link.style.display = 'none'
            link.href = blobUrl
            link.setAttribute('download', fileName)
            window.document.body.appendChild(link)
            link.click()

            // 4. 清理内存和 DOM 节点
            window.document.body.removeChild(link)
            window.URL.revokeObjectURL(blobUrl)
        }).catch((error) => {
            console.error('下载文件失败:', error)
        })
    }
}