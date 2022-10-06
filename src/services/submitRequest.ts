import axios from 'axios'
import { stringify } from 'qs'

import getFormattedString from '../utils/date'
import { success, info, warn } from '../utils/output'
import { responsParser } from '../utils/parser'
import checker from '../utils/checker'

import LocationModel from '../model/location.model'
import UserinfoModel from '../model/userinfo.model'

type Params = {
  id: string
  id2: string
}

// 运行时的日期 作为提交的参数之一
const today = getFormattedString()
const rowParmas: string = '&wuhan=%E5%90%A6&wuhan=%E5%90%A6&wuhan=%E3%80%90%E4%BD%8E%E3%80%91%E5%9B%9B%E5%B7%9D%E7%9C%81%E6%88%90%E9%83%BD%E5%B8%82%E9%BE%99%E6%B3%89%E9%A9%BF%E5%8C%BA%E9%BE%99%E6%B3%89%E9%A9%BF%E5%8C%BA%E9%99%A4%E9%AB%98%E3%80%81%E4%B8%AD%E9%A3%8E%E9%99%A9%E5%8C%BA%E4%BB%A5%E5%A4%96%E7%9A%84%E5%85%B6%E4%BB%96%E5%8C%BA%E5%9F%9F&action=add&adds=&addsxy='
const nonriskParams: string = '&wuhan=%E5%90%A6&wuhan=%E5%90%A6&wuhan=%E5%90%A6&action=add&adds=&addsxy='

// 提交请求的响应结果
const responsMap: Map<string, boolean> = new Map([
  ['登记失败', false],
  ['提交成功', true],
  [today + '登记已存在', true]
])

// 不带地址的一键登记，返回值代表是否执行成功
const signIn = async (url: string, id: string): Promise<boolean> => {
  // 需要携带的 params 参数
  const params: Params = { id, id2: today }

  info('一键登记中...')
  // 遇到的坑：axios 会自动去掉 params 中值为 undefined 或者空字符串(falsy)的键
  // 而请求时如果不携带 adds 和 addsxy，ISP 会认为没有开启定位，因此这里只能写成 'undefined' 而不能用 undefined
  const { data } = await axios.get(url, { params: { ...params, adds: 'undefined', addsxy: 'undefined' } })

  // 解析页面返回结果
  const msg = responsParser(data)
  const res = responsMap.get(msg!)!
  res ? success(msg!) : warn(msg + '\n无法完成一键登记，尝试常规登记...')
  return res
}

// 带有地址的常规登记，无返回值，失败了直接抛出错误，代表打卡操作失败了
const signInWithLocation = async (
  url: string,
  location: LocationModel,
): Promise<void> => {
  info('你的地址信息如下：')
  console.log(location)

  info('常规登记中...')
  const { province, city, area } = location
  const body: string = stringify({
    province,
    city,
    area,
    hcode: '绿码',
    kesou: '否',
    zhengduan: '',
    fare: '否',
    wls: '否',
    wuhan: '否'
  })
  const params = province + city + area === '四川省成都市龙泉驿区' ? rowParmas : nonriskParams
  const { data } = await axios.post(url, body + params)
  // 解析页面返回结果
  const msg = responsParser(data)
  const res = responsMap.get(msg!)!
  checker(res, msg, new Error('常规登记出错'))
}

const submitRequest = async (
  isFirstExec: boolean,
  userinfo: UserinfoModel,
  id: string,
  ...urls: Array<string>
): Promise<void> => {
  // 一键登记的地址、常规登记的地址
  const [url, generalUrl] = urls
  const { province, city, area } = userinfo
  const location = { province, city, area } as LocationModel
  info(`尝试提交${today}的打卡申请...`)

  // 是第一次执行进行常规登记，否则一键登记，一键登记失败则常规登记
  !isFirstExec && await signIn(url, id) || await signInWithLocation(generalUrl, location)
}

export default submitRequest
