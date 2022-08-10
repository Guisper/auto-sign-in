// ISP有多个站点 这是其中的一个 若挂掉了更改一下即可
const base = 'https://xsswzx.cdu.edu.cn/ispstu/com_user/'

// 依次为 登陆地址 获取id地址 提交临时离校申请请求地址 离校申请页面地址 离校凭证页面地址
const urls: Array<string> = [
  'weblogin',
  'webindex',
  'projecthealth_addx',
  'projecthealth_add',
  'projecthealth'
]
  .map(s => base + s)
  .map(u => u + '.asp')

const [loginUrl, idUrl, signInUrl, generalSignInUrl, pageUrl] = urls

export { loginUrl, idUrl, signInUrl, generalSignInUrl, pageUrl }
