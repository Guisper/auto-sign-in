import * as dotenv from 'dotenv'
import CryptoJS from 'crypto-js'

import input from '../utils/input'
import { reader, writer, checkDir } from '../utils/io'
import checker from '../utils/checker'
import { info, warn } from '../utils/output'
import { staticPath, userinfoPath } from '../utils/path'
import { isValidInput, isValidUsername, isValidPassword, isValidUserInfo } from '../utils/validator'

import QuestionModel from '../model/question.model'
import LocationModel from '../model/location.model'
import UserinfoModel from '../model/userinfo.model'

dotenv.config()

const { enc: { Utf8 }, Rabbit: { encrypt, decrypt } } = CryptoJS
const { ACCOUNT, PASSWORD, PROVINCE, CITY, AREA } = process.env
const key = '&#!.))*:|l}o' // Secret Key
let isFirstExec: boolean = false // 是否第一次运行

// 是否使用 Github Action 打卡
const isAutoSignIn: boolean = !!(ACCOUNT && PASSWORD)
// 通过 Github Action 配置的参数
const autoSignInUserinfo = {
  username: ACCOUNT,
  userpwd: PASSWORD,
  province: PROVINCE,
  city: CITY,
  area: AREA
} as UserinfoModel

// 账号密码
const acctPwdQuestion: Array<QuestionModel> = [
  {
    name: 'username',
    type: 'input',
    message: '请输入12位学号：',
    validate(val: string) {
      return isValidUsername(val) || '你这学号有问题啊'
    }
  },
  {
    name: 'userpwd',
    type: 'password',
    message: '请输入你的ISP密码：',
    mask: true,
    validate(val: string) {
      return isValidPassword(val) || '你这密码保真吗？怎么六位都不到啊'
    }
  }
]

// 地址
const locationQuestion: Array<QuestionModel> = [
  {
    name: 'province',
    type: 'input',
    message: '请输入你所在的省：',
    validate(val: string) {
      return isValidInput(val) || '还没输入呢'
    }
  },
  {
    name: 'city',
    type: 'input',
    message: '请输入你所在的市：',
    mask: true,
    validate(val: string) {
      return isValidInput(val) || '还没输入呢'
    }
  },
  {
    name: 'area',
    type: 'input',
    message: '请输入你所在的区/县：',
    mask: true,
    validate(val: string) {
      return isValidInput(val) || '还没输入呢'
    }
  }
]

// Yes or No 问题
const alternativeInquirer = (message: string): Array<QuestionModel> => [
  {
    message,
    name: 'answer',
    type: 'rawlist',
    choices: [
      { name: '是', value: true },
      { name: '否', value: false }
    ],
    default: 0
  }
]

// 保存加密后的用户信息到文件
const saveUserinfo = async ({ ...data }): Promise<void> => {
  info('即将在 static/userinfo.json 创建文件保存信息...')
  for (const [k, v] of Object.entries(data)) {
    data[k] = encrypt(v.toString(), key).toString()
  }
  await checkDir(staticPath)
  await writer(userinfoPath, JSON.stringify(data))
}

// 根据问题列表获取信息
const questionQuery = async (
  questionList: Array<QuestionModel>
): Promise<LocationModel | UserinfoModel> => {
  const res = await input(questionList)
  return res
}

// 询问是否更改信息 并保存文件
const needRewriteUserinfo = async (
  oldUserinfo: UserinfoModel,
  includeLocation: boolean = true
): Promise<UserinfoModel> => {
  const message = includeLocation ? '需要重新录入信息吗?' : '需要重新输入账号密码吗?'
  const questionList = includeLocation ? [...acctPwdQuestion, ...locationQuestion] : acctPwdQuestion
  const { answer } = await input(alternativeInquirer(message))
  checker(answer, '', '用户信息不完整')
  const newUserinfo = await questionQuery(questionList)
  const userinfo: UserinfoModel = { ...oldUserinfo, ...newUserinfo }
  await saveUserinfo(userinfo)
  return userinfo
}

// 验证帐号密码和地址信息 对一些情况做了处理
const checkUserinfo = async (): Promise<[boolean, boolean, UserinfoModel]> => {
  // 如果是在 Github Actions 中配置了，则无需验证本地文件，且默认每次提交是常规提交
  if (isAutoSignIn) {
    checker(isValidUserInfo(autoSignInUserinfo), '参数验证完成', '参数不完整！请检查你的 Secrets')
    return [true, true, autoSignInUserinfo]
  }
  info('验证文件信息...')
  let userinfo: UserinfoModel | null = null
  try {
    const [fileNotExists, res] = await reader(userinfoPath)
    if (fileNotExists) {
      // 文件不存在则从控制台读取输入 并写入文件
      isFirstExec = true
      info('文件不存在，需要输入以下信息')
      userinfo = (await questionQuery([...acctPwdQuestion, ...locationQuestion])) as UserinfoModel
      await saveUserinfo(userinfo!)
    } else {
      // 存在则解密文件
      for (const [k, v] of Object.entries(res!)) {
        ;(res as any)[k] = decrypt(v, key).toString(Utf8)
      }
      userinfo = res as UserinfoModel
    }
    checker(isValidUserInfo(userinfo), '验证完成', '文件应包含的字段不完整')
  } catch (e) {
    warn('检测到' + e)
    userinfo = await needRewriteUserinfo(userinfo!)
  }
  return [false, isFirstExec, userinfo!]
}

export { checkUserinfo, needRewriteUserinfo }
