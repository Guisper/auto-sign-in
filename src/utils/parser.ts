type parseResult = string | undefined

// 解析登录页面的验证码
const codeParser = (str: string): parseResult => str?.match(/(?<=&nbsp;&nbsp;)\d{4}/)?.[0]
// 解析页面的响应结果
const responsParser = (str: string): parseResult => str?.match(/(?<=alert\(').+?(?=[。，\!])/)?.[0]?.replace(/【|】/g, '')
// 解析登陆后页面上的用户id
const idParser = (str: string): parseResult => str?.match(/(?<=changeIframe\('.+?\.asp\?id=)\w{44}(?=')/)?.[0]

export { codeParser, responsParser, idParser }
