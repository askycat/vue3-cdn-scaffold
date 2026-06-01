(function () {
  function formatDate(value) {
    if (!value) return '-'

    const date = new Date(value)

    return date.toLocaleString('zh-CN', {
      hour12: false
    })
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  window.utils = {
    formatDate,
    sleep
  }
})()
