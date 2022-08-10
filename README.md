# 成都大学ISP一键打卡

## 安装

```bash
git clone --single-branch --branch master https://gitee.com/Guisper/auto-sign-in.git
```

## 运行

请确保`Nodejs`版本在14以上

```bash
# 安装依赖
npm i

# 启动
npm run dev

# 打包
npm run build

# 打包后运行
npm start
```

## 说明

### 更新说明
又到了一年两度的返校季，看了一下之前写的自动打卡代码（位于source分支），发现了很多问题，代码写得太冗余了，交互也不够人性化，没有注释，经典自己写的代码只有自己能看懂。再加上ISP更新了，打卡后的页面信息处理的那部分逻辑基本上失效了。因此决定重构一下，更新如下：
- 使用了更规范的`TypeScript`，增加了类型注释
- 为代码增加了部分注释，提高可读性
- 抽离了部分逻辑，封装成不同的模块
- 更改展示打卡结果的方式：命令行窗口的表格-->页面
- 更换了部分第三方包以获得更好的交互（比如命令行交互工具[inquirer](https://www.npmjs.com/package/inquirer)）
- 网络请求部分统一使用`promise`风格的`axios`，使用拦截器设置请求头而不是每次手动加上

### 使用说明
TODO:Finish Me

### 自动打卡
TODO:Finish Me