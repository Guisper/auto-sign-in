import axios from 'axios'

import { error, warn } from './output'
import HeaderModel from '../model/header.model'

// 设置请求超时时间、超时重传次数、超时重传间隔
axios.defaults.timeout = 10 * 1000
;(axios.defaults as any).retry = 3
;(axios.defaults as any).retryDelay = 1000

// 通过 axios 拦截器设置请求头

// 用于加入 cookie
const setHeaders = (headers: HeaderModel) => {
  axios.interceptors.request.use(config => {
    for (const [k, v] of Object.entries(headers)) {
      config.headers![k] = v
    }
    return config
  })
}

// 用于超时自动重传
const retryTimeout = () => {
  axios.interceptors.response.use(undefined, async err => {
    const { config } = err
    config.__retryCount = config.__retryCount ?? 0
    if (config.__retryCount >= config.retry) {
      error('重试次数达到上限：', `已重试了${config.__retryCount}次，均失败`)
      return Promise.reject(err)
    }
    warn(`请求失败了，正在进行第${config.__retryCount + 1}次重试...`)
    config.__retryCount += 1
    const backoff = new Promise<void>(resolve => {
      setTimeout(() => resolve(), config.retryDelay ?? 1000)
    })
    await backoff
    const res = await axios(config)
    return res
  })
}

export { setHeaders, retryTimeout }
