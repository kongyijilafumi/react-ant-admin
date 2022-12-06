# react-ant-admin

[![GitHub star](https://img.shields.io/github/stars/kongyijilafumi/react-ant-admin?label=GitHub%20Star)](https://github.com/kongyijilafumi/react-ant-admin)
[![GitHub fork](https://img.shields.io/github/forks/kongyijilafumi/react-ant-admin?label=GitHub%20fork)](https://github.com/kongyijilafumi/react-ant-admin/network/members)
[![Gitee star](https://gitee.com/kong_yiji_and_lavmi/react-ant-admin/badge/star.svg?theme=dark)](https://gitee.com/kong_yiji_and_lavmi/react-ant-admin/stargazers)
[![Gitee fork](https://gitee.com/kong_yiji_and_lavmi/react-ant-admin/badge/fork.svg?theme=dark)](https://gitee.com/kong_yiji_and_lavmi/react-ant-admin/members)
![](https://img.shields.io/github/license/kongyijilafumi/react-ant-admin)

TypeScript 版[GitHub(国外地址)](https://github.com/kongyijilafumi/react-ant-admin-ts) |
TypeScript 版[码云(国内镜像)](https://gitee.com/kong_yiji_and_lavmi/react-ant-admin-ts)

JavaScript 版[GitHub(国外地址)](https://github.com/kongyijilafumi/react-ant-admin) |
JavaScript 版[码云(国内镜像)](https://gitee.com/kong_yiji_and_lavmi/react-ant-admin)

此框架使用与二次开发，前端框架使用 react，UI 框架使用 ant-design，全局数据状态管理使用 redux，ajax 使用库为 axios。用于快速搭建中后台页面。欢迎各位提[issue](https://github.com/kongyijilafumi/react-ant-admin/issues)

- [react](https://react.docschina.org/)
- [react-router-cache-route](https://www.npmjs.com/package/react-router-cache-route)
- [ant-design](https://ant.design/index-cn)
- [redux](https://redux.js.org/)
- [axios](http://www.axios-js.com/)

## 预览地址

[react-ant-admin](http://z3web.cn/react-ant-admin/)

nodejs 后台 web 服务:[react-ant-admin-server](https://gitee.com/kong_yiji_and_lavmi/react-ant-admin-server)

## 关于此框架二次开发

[视频讲解地址下载(百度云)](https://pan.baidu.com/s/1El4ndtW28nffGgAqHA1Wag),提取码`e7n1`

[视频讲解地址下载(阿里云)](https://www.aliyundrive.com/s/v499WGyEU5s)

## 文档地址

[react-ant-admin 文档地址](https://z3web.cn/doc-react-ant-admin/)

更多建议欢迎骚扰~

[qq 交流群:532948540](https://qm.qq.com/cgi-bin/qm/qr?k=Wo_kXUOA-mTBviZ6gF4H912AKdE5vTML&jump_from=webapi)

![qrcode](https://raw.githubusercontent.com/kongyijilafumi/my-image/master/qq.jpg)

欢迎各位提出建议与问题!

## [接口文档地址](https://www.apifox.cn/apidoc/project-927261)

## 特性

- 菜单配置:扁平化数据组织,方便编写,存库,页面菜单,标题,侧边栏,顶部导航栏同步
- 页面懒加载:使用[@loadable/component](https://loadable-components.com/docs/getting-started/)来解决首次打开页面过慢的问题.
- Ajax 请求：restful 规范，自动错误提示，提示可配置；自动打断未完成的请求；
- 权限控制: 根据不用角色的功能类型显示菜单,路由页面拦截.
- 自定义主题，可以自己定义界面颜色。
- 代理转发，解决前端请求跨域问题。
- 路由自动生成，去中心化。

系统提供了一些基础的页面

- 登录页
- 详情页
- 表单页
- 列表页
- 权限管理
- 结果页

## 切换 Vite 版本

1. 切换分支

```bash
D:\react-ant-admin>git checkout vite
```

2. 安装依赖

```bash
D:\react-ant-admin>cnpm i
```

3. 启动

```bash
D:\react-ant-admin>npm run dev
```

## 快速使用

1. 下载本项目到本地

```bash
D:> git clone https://github.com/kongyijilafumi/react-ant-admin.git #github地址 慢
D:> git clone https://gitee.com/kong_yiji_and_lavmi/react-ant-admin.git #码云地址 快
```

2. 安装依赖

```bash
# npm 慢
npm i
# cnpm 国内镜像 快
cnpm i
```

3. 启动

```bash
npm run "start:mock" # 启动本地mock数据 (暂时没有后台接口,请用此模式预览项目)
npm run start # 启动本地API接口来获取数据
```

浏览器打开 `http://localhost:3000` 即可

## 创建一个新的页面

1. 在 src/pages 文件夹下创建一个 test.js 文件,代码如下

```js
// 函数组件
import React from "react";

export default function Test() {
  return <div>test页面</div>;
}

// 类组件
export default class Test extends React.Component {
  render() {
    return <div>test页面</div>;
  }
}

/**
 * MENU_* 开头信息在package.json 文件中找到
 * 给 pages 组件追加路由信息
 * export default 组件的原型上添加route信息,或者向外暴露一个 route
 * 会被webpack的webpack-router-generator插件捕获信息
 */

// 1.被捕获 export default 原型上的route
Test.route={
  [MENU_TITLE] : "test页面",
  [MENU_KEY] : "test",
  [MENU_PATH]: "/test"
}

// 2.被捕获 暴露的route信息  优先级比上面高
export const route = {
  [MENU_TITLE] : "test页面",
  [MENU_KEY] : "test",
  [MENU_PATH]: "/test"
}
```

2. 浏览器访问 `http://localhost:3000/react-ant-admin/test` 即可

## 创建一个菜单

该添加方式适用于 `npm run "start:mock"`启动的项目

1. 在`src/mock/index.js` 找到`menu`变量,往里添加一条菜单信息.代码如下所示

```js
let menu = [
  {
    menu_id: 9,
    [MENU_TITLE]: "列表页",
    [MENU_PATH]: "/list",
    [MENU_KEY]: "list",
    [MENU_PARENTKEY]: "",
    [MENU_ICON]: "icon_list",
    [MENU_KEEPALIVE]: "false",
    [MENU_LAYOUT]:"FULLSCREEN" // 页面内容主题全屏显示 布局
    order: 1,
  },
  {
    menu_id: 10,
    [MENU_TITLE]: "卡片列表",
    [MENU_PATH]: "/card",
    [MENU_KEY]: "listCard",
    [MENU_PARENTKEY]: "list",
    [MENU_ICON]: "",
    [MENU_LAYOUT]:"TWO_COLUMN" // 拥有侧边栏的 布局 此属性默认可以不填 在 src/layout/index.js defualt 项导出一个默认布局
    [MENU_KEEPALIVE]: "false",
    order: 5485,
  },
  // .... 开始添加菜单信息 ....
  {
    menu_id: 11, // 菜单id 用于关联权限
    [MENU_TITLE]: "test", // 标题
    [MENU_PATH]: "/test", // 访问路径
    [MENU_KEY]: "test", // 唯一key
    [MENU_PARENTKEY]: "", // 空表示 为主菜单而非子菜单
    [MENU_ICON]: "icon_infopersonal", // 菜单图标
    order: 1, // 菜单排序 越小越靠前
    [MENU_KEEPALIVE]: "true", //  页面保持状态
  },
  // .....
];
```

2. 由于菜单会走本地会话存储`window.sessionStorage`,所以保存代码后需要关闭当前窗口,重新打开地址 `http://localhost:3000/react-ant-admin`

> 打开之后,会发现菜单会多出一个`test`栏目,点击会打开之前我们创建的 test 页面.这样就完成了菜单和页面的编写.

## 脚本启动

在完成依赖安装之后,有以下几种启动方式。

- npm run start

请求接口数据，通过后台返回数据显示项目信息

- npm run "start:color"

请求接口数据，通过后台返回数据显示项目信息，并且开启主题色配置。

- npm run "start:mock"

本地模拟数据，假数据来显示项目信息

- npm run "start:mock_color"

本地模拟数据，假数据来显示项目信息，并且开启主题色配置。

- npm run build

普通打包模式。

- npm run "build:color"

打包主题色。项目体积会有所增加。

### vscode 快速启动项目

使用[vscode 编辑器](https://code.visualstudio.com/)[下载地址](https://blog.csdn.net/bielaiwuyang1999/article/details/117814237)

把此项目文件夹拖入`vscode编辑器`,找到左下角`npm 脚本栏目`选择快速启动，免命令。
![免命令示例图](https://raw.githubusercontent.com/kongyijilafumi/my-image/master/run.png)

## 项目截图

- 登录

![登录](https://raw.githubusercontent.com/kongyijilafumi/my-image/master/react-ant-admin-doc01.png)

- 详情页

![详情页](https://raw.githubusercontent.com/kongyijilafumi/my-image/master/react-ant-admin-detail.png)

- 列表

![表格](https://raw.githubusercontent.com/kongyijilafumi/my-image/master/react-ant-admin-list.png)

- 权限管理

![权限管理](https://raw.githubusercontent.com/kongyijilafumi/my-image/master/react-ant-admin-power.png)

- 结果页

![结果页](https://raw.githubusercontent.com/kongyijilafumi/my-image/master/react-ant-admin-result1.png)
