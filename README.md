# 成都大学ISP一键打卡

## 自动任务

如果你还有没有 `Github` 账号，请先去注册(`Sign up`)

自动打卡通过 `Github Actions` 完成，步骤如下

### 自动打卡

#### Fork 本仓库

- 点击 `Fork`
- 在打开的页面点 `Create fork`

![fork仓库](http://guisper.gitee.io/image/image/github/auto-sign-in/1660272853660.png)

#### 在 Settings 中配置 Actions

- 点击 `Settings` —— `Actions` —— `General`
- 设置 `Actions permissions` 为 `Allow all actions and reusable workflows`
- 点击 `Save` 按钮保存

![设置Actions](http://guisper.gitee.io/image/image/github/auto-sign-in/1660272992317.png)

#### 在 Settings 中配置 Secrets

- 点击 `Secrets` —— `Actions`
- 点击 `New repository secret` 添加你的 `Repository secrets`，其中 `Name` 是字段， `Value` 是值，需要包括：
  - `USERNAME`：你的学号
  - `PASSWORD`：你的ISP密码
  - `PROVINCE`：所在的省
  - `CITY`：所在的市
  - `AREA`：所在的区/县

![创建Secrets](http://guisper.gitee.io/image/image/github/auto-sign-in/1660273025502.png)

#### 在 Actions 中开启自动任务

`Actions` —— `I understand my workflows, go ahead and enable them`

![开启自动任务1](http://guisper.gitee.io/image/image/github/auto-sign-in/1660408632078.png)

在跳转后的界面：`Github Action Auto Sign In` —— `Enable workflow` 。开启后就没有浅黄色的警告条了。

![开启自动任务2](http://guisper.gitee.io/image/image/github/auto-sign-in/1660408723309.png)

至此自动打卡的配置已经完成，自动任务已开启。如果需要发送邮箱，还需要添加两个字段，参考接下来的发送邮箱步骤。

### 发送邮箱

#### 获取QQ邮箱授权码

参考：[QQ邮箱帮助中心——设置授权码](https://service.mail.qq.com/cgi-bin/help?subtype=1&&no=1001256&&id=28)

#### 增加 Secrets 字段

`Settings` —— `Secrets` —— `Actions` —— `New repository secret` ，除了上面已经添加的五个字段外，还需要添加：

- `MAILUSERNAME`：你的QQ邮箱地址
- `MAILPASSWORD`：邮箱授权码

添加完成后，你的 `Secrets` 应该包含这七个字段：

![添加完成后的字段](http://guisper.gitee.io/image/image/github/auto-sign-in/1660411170081.png)

#### 关闭自动任务失败发送邮箱

`Github Actions` 默认会在自动任务执行失败后发送邮箱，可以参考下面的步骤关闭：

`右上角头像` —— `Settings` —— `Notifications`

![设置——通知](http://guisper.gitee.io/image/image/github/auto-sign-in/1660410137862.png)

往下滑一点点找到 `Actions` ，取消 `Email` 前面的勾选即可

![Actions邮箱](http://guisper.gitee.io/image/image/github/auto-sign-in/1660410450259.png)

### 自动任务说明

- 请确保你配置的 `Secrets` 的 `Name` 和 `Value` 完整和正确，这是自动提交任务和成功后发送邮箱的前提
- 你的 `Secrets` 由 `Github` 加密保管，详见：[GitHub Actions Secrets - GitHub Docs](https://docs.github.com/en/rest/actions/secrets#about-the-secrets-api)
- 由于ISP开放(不用通过 `vpn` 也能访问)的时间不确定，因此目前设置的自动打卡频率为每四小时一次，一天之内会尝试打六次卡，打卡成功后才会发送邮箱：
  - 一天之内可能会收到多封打卡结果的邮箱
  - 当然也有可能六次尝试均失败，如果你在晚上21:00还未收到当天打卡结果的邮箱，请尝试登录ISP手动打卡
- 配置完成之后，就等着收邮箱吧~

![QQ邮箱收件](http://guisper.gitee.io/image/image/github/auto-sign-in/1660519928098.png)

## 手动任务

配置了上面的自动任务后可以不管手动任务了。当然，如果你对此程序是如何在本地运行的感兴趣，可以安装并配置运行环境来尝试一下。

### 安装

```bash
git clone https://github.com/Guisper/auto-sign-in.git
```

### 运行

请确保 `Nodejs` 版本在14以上，推荐使用 `yarn` 来管理包

> npm 版本：

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

> yarn 版本：

```bash
# 更换yarn镜像
yarn config set registry https://registry.npm.taobao.org

# 安装依赖
yarn

# 启动
yarn dev

# 打包
yarn build

# 打包后运行
yarn start

# 打包成 Windows 应用
yarn build-app
```

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

如果需要打包到其他平台，请更改 `package.json` 的 `pkg.targets` ，具体规则参照 [pkg - npm](https://www.npmjs.com/package/pkg)

### 项目结构

```
auto-sign-in  根目录
├── LICENSE   开源协议
├── README.md 自述文件
├── build 运行 npm run build 生成的打包文件目录
├── dist  运行 npm run build-app 生成的应用目录
├── package.json 项目依赖和一些配置项
├── src 项目根目录
│   ├── index.ts   入口文件，从这里开始运行
│   ├── model      TypeScript Interface
│   │   ├── IPAddress.model.ts IP地址模型
│   │   ├── header.model.ts    请求头模型
│   │   ├── location.model.ts  地址模型
│   │   ├── question.model.ts  问题模型
│   │   └── userinfo.model.ts  用户信息模型
│   ├── services   完成打卡操作的必须流程
│   │   ├── createServer.ts    开启本地服务器展示页面
│   │   ├── getPageResult.ts   获取页面结果
│   │   ├── getUserId.ts       获取用户id
│   │   ├── login.ts           登录并注册token
│   │   ├── submitRequest.ts   提交打卡申请
│   │   └── userinfoUnit.ts    用户信息的各类操作
│   └── utils      工具类
│       ├── checker.ts         条件检查
│       ├── date.ts            日期操作
│       ├── input.ts           从控制台读取输入
│       ├── interceptors.ts    设置拦截器
│       ├── io.ts              文件读写
│       ├── networkAddress.ts  获取IP地址和端口
│       ├── output.ts          输出内容到控制台
│       ├── page.ts            页面资源处理
│       ├── parser.ts          解析器
│       ├── path.ts            本地静态资源路径
│       ├── quit.ts            延迟退出
│       ├── url.ts             请求地址
│       └── validator.ts       参数验证
└── tsconfig.json  代码的编译选项
```
