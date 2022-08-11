# 成都大学ISP一键打卡

## 安装

```bash
# gitee
git clone --single-branch --branch master https://gitee.com/Guisper/auto-sign-in.git

# github
git clone https://github.com/Guisper/auto-sign-in.git
```

当然，如果你不想折腾 `Node` 环境来编译运行源代码的话，也可以去[release分支](https://gitee.com/Guisper/auto-sign-in/tree/release/)下载构建好的应用

## 运行

请确保 `Nodejs`版本在14以上

```bash
# 更换npm镜像
npm config set registry https://registry.npm.taobao.org

# 安装依赖
npm i

# 启动
npm run dev

# 打包
npm run build

# 打包后运行
npm start

# 打包成 Windows 应用
npm run build-app
```

## 说明

### 更新说明

又到了一年两度的返校季，看了一下之前写的自动打卡代码（位于source分支），发现了很多问题，代码写得太冗余了，交互也不够人性化，没有注释，经典自己写的代码只有自己能看懂。再加上ISP更新了，打卡后的页面信息处理的那部分逻辑基本上失效了。因此决定重构一下，更新如下：

- 使用了更规范的 `TypeScript`，增加了类型注释
- 为代码增加了部分注释，提高可读性
- 抽离了部分逻辑，封装成不同的模块
- 更改展示打卡结果的方式：命令行窗口的表格-->页面
- 更换了部分第三方包以获得更好的交互（比如命令行交互工具[inquirer](https://www.npmjs.com/package/inquirer)）
- 网络请求部分统一使用 `promise`风格的 `axios`，使用拦截器设置请求头而不是每次手动加上

### 使用说明

> 运行

- 第一次运行需要输入一些必要的信息，包括：
  - 你的ISP账号和密码
  - 地址信息（省、市、区）
- 请确保你的信息正确，以后打卡将使用这些信息
  - 账号密码的错误会在登陆时检测到，重新输入即可
  - 如果需要更改地址重新删除文件 `static/userinfo.json` 再运行即可
- 运行成功后的打卡结果会以页面形式呈现


> 打包到其他平台

如果需要打包到其他平台，请更改 `package.json` 的 `pkg.targets` ，具体规则参照[pkg - npm](https://www.npmjs.com/package/pkg)


### 自动打卡

自动打卡通过 `Github Actions`完成，下面的操作需要到 `Github` 上进行，如果需要自动打卡，请移步到 `Github` 仓库：[Guisper/auto-sign-in](https://github.com/Guisper/auto-sign-in)

> Fork 本仓库



> 在 Settings 中配置 Actions

- 点击 `Settings` —— `Actions` —— `General`
- 设置 `Actions permissions` 为 `Allow all actions and reusable workflows`
- 点击 `Save` 按钮保存

> 在 Settings 中配置 Secrets

- 点击 `Settings` —— `Secrets` —— `General`
- 点击 `New repository secret` 添加 `Secrets`，字段需要包括：
  - `USERNAME`：你的学号
  - `PASSWORD`：你的ISP密码
  - `PROVINCE`：所在的省
  - `CITY`：所在的市
  - `AREA`：所在的区/县
