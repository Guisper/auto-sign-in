const requiredKeys = ['username', 'userpwd', 'province', 'city', 'area']

// 验证各种参数的合法性 具体规则看代码
const isValidInput = (str: string): boolean => str.length > 0
const isValidUsername = (username: string): boolean => /^\d{12}$/.test(username)
const isValidPassword = (password: string): boolean => /.{6,}/.test(password)
const isValidUserInfo = (userinfo: any): boolean => requiredKeys.every(key => key in userinfo)

export { isValidInput, isValidUsername, isValidPassword, isValidUserInfo }
