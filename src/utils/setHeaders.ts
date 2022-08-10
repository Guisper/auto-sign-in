import axios from 'axios'
import HeaderModel from '../model/header.model'

// 通过 axios 拦截器设置请求头 主要用于加入 cookie
const setHeaders = (headers: HeaderModel) => {
  axios.interceptors.request.use(config => {
    for (const [k, v] of Object.entries(headers)) {
      config.headers![k] = v
    }
    return config
  })
}

export default setHeaders
