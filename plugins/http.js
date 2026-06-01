import http from '../utils/axios.js'

export default function (app) {
  window.http = http
  app.provide('http', http)
  app.config.globalProperties.$http = http
}