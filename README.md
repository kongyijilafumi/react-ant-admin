# react-ant-admin

此框架使用与二次开发，前端框架使用react，UI框架使用ant-design，全局数据状态管理使用redux，ajax使用库为axios。用于快速搭建中后台页面。
* [react](https://react.docschina.org/)
* [ant-design](https://ant.design/index-cn)
* [redux](https://redux.js.org/)
* [axios](http://www.axios-js.com/)

## 预览地址

[react-ant-admin](http://azhengpersonalblog.top/react-ant-admin/)

## 示例图

* 登录

![登录](https://gitee.com/kong_yiji_and_lavmi/my-image/raw/master/react-ant-admin-doc01.png)

* 首页

![首页](https://gitee.com/kong_yiji_and_lavmi/my-image/raw/master/react-ant-admin-doc02.png)

* 表格

![表格](https://gitee.com/kong_yiji_and_lavmi/my-image/raw/master/react-ant-admin-doc03.png)

* icon库

![icon库](https://gitee.com/kong_yiji_and_lavmi/my-image/raw/master/react-ant-admin-doc04.png)

* 拖拽组件

![拖拽组件](https://gitee.com/kong_yiji_and_lavmi/my-image/raw/master/react-ant-admin-doc05.png)

## 使用

* 当然是检查是否有node环境！

```
C:>node -v
v12.*.*
```

* 安装依赖

```js
// npm 慢
npm i
// cnpm 国内镜像 快
cnpm i
```

* 启动

```
npm run start

浏览器打开  http://localhost:3000   即可
```


## 使用指南

 * 你可以在该项目使用less，scss的css预处理语言

 >若你想要全局引用样式文件，需要在根目录下的/config/webpack.config.js文件，找到rules里的css匹配规则自行添加全局引用的文件路径。举例：

 ```js
{
  test: cssRegex,
  exclude: cssModuleRegex,
  use: getStyleLoaders({
    importLoaders: 1,
    sourceMap: isEnvProduction
      ? shouldUseSourceMap
      : isEnvDevelopment,
  }).concat({
    loader: "sass-resources-loader",
    options: {
      resources: [
        // resolve方法第二个参数为scss配置文件地址，如果有多个，就进行依次添加即可
        path.resolve(paths.appSrc, "asset/css/global.css"), // 路径指向 root/src/asset/css/global.css
      ],
    },
  }),
  sideEffects: true,
},
 ```
* 导航栏同步，可拖拽的顶部导航栏

>左侧导航栏与顶部导航栏会同步显示高亮，顶部导航栏使用react-beautiful-dnd组件进行拖拽排序，方便快速浏览

* 别名使用

`@`:指向当前项目的src文件路径

`@pages`:指向当前项目的`src/pages`文件路径

若自行想添加别名，可以在`/config/webpack.config.js`文件，找到alias字样自行添加相应路径即可。 举例：

```js
alias:{
  .....
  "@asset":path.join(paths.appSrc,"asset"),
}
```

* 使用keep-alive对页面数据持久化

>在当前项目`src/pages/`下完成页面编写后， 在`src/router/route/index.js`配置加上编写的组件，渲染的方式，对应的路由等等...
举例：

```js
import Home from "@pages/home"; 
const routerList = [{
    ......
  },{
  path: "/home",
  keepAlive: true, // 页面数据持久化
  title: "主页",
  key: "Home",
  components: Home,// 导入的组件
}] 
export default routerList;
```

* 更多内容还在努力完善