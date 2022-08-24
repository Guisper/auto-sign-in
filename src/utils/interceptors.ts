import axios from 'axios'

import { error, warn } from './output'
import HeaderModel from '../model/header.model'

// 设置请求超时时间、超时重传次数
axios.defaults.timeout = 10 * 1000
;(axios.defaults as any).retry = 3

// 休眠函数，让程序睡一会
const sleep = (min = 1000, rand = 1500) => new Promise(resolve => setTimeout(resolve, (rand * Math.random() + min) >> 0))

// 通过 axios 拦截器设置请求头
// 用于加入 cookie
const setHeaders = (headers: HeaderModel) => {
  axios.interceptors.request.use(config => {
    return new Promise(resolve => {
      for (const [k, v] of Object.entries(headers)) {
        config.headers![k] = v
      }
      sleep().then(() => resolve(config))
    })
  })
}
// 用于超时自动重传
const retryTimeout = () => {
  axios.interceptors.response.use(
    response => response,
    err => new Promise((resolve, reject) => {
      const { config } = err
      config.retryCount ??= 0
      if (config.retryCount >= config.retry) {
        error('重试次数达到上限：', `已重试了${config.retryCount}次，均失败`)
        return reject(err)
      }
      config.retryCount += 1
      warn(`请求失败了，正在进行第${config.retryCount}次重试...`)
      sleep().then(() => resolve(axios(config)))
    })
  )
}

export { setHeaders, retryTimeout }
