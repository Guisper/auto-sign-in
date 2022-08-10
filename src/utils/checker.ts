import { success } from './output'

// 判断条件 通过则输出成功信息 否则抛出错误信息
const checker = (condition: any, successMsg: string | undefined, reason: string | Error): void => {
  if (condition) {
    successMsg && success(successMsg)
  } else {
    throw reason
  }
}

export default checker
