import React from "react";
import { Anchor } from "antd";
import "./index.scss";

const { Link } = Anchor;

function Home() {
  return (
    <div className="home-container">
      <Anchor>
        <Link href="#less_scss" title="less,scss使用" />
        <Link href="#alias" title="别名设置" />
        <Link href="#navigation" title="添加导航栏" />
        <Link href="#router" title="页面添加路由" />
      </Anchor>
      <h2>欢迎使用 React-ant-admin ！</h2>
      <h3>使用指南：</h3>
      <div className="title" id="less_scss">
        你可以在该项目使用less，scss的css预处理语言
      </div>
      <p className="content">
        全局引用样式文件需要在根目录下的
        <span className="bold">/config/webpack.config.js</span>文件，找到
        <span className="bold">
          rules里的css匹配规则自行添加全局引用的文件路径
        </span>
        举例：
        <code>
          {`{
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
        // resolve方法第二个参数为scss配置文件地址，如果有多个，就进行依次添加即可
        path.resolve(paths.appSrc, "asset/css/global.css"), // 路径指向 root/src/asset/css/global.css
      ],
    },
  }),
  sideEffects: true,
},`}
        </code>
      </p>
      <div className="title">导航栏同步，可拖拽的顶部导航栏</div>
      <p className="content">
        左侧导航栏与顶部导航栏会同步显示高亮，顶部导航栏使用
        <span className="bold">react-beautiful-dnd</span>
        组件进行拖拽排序，方便快速浏览
      </p>
      <div className="title" id="alias">别名使用</div>
      <p className="content">
        <span className="bold">@</span>:指向当前项目的
        <span className="bold">src</span>
        文件路径
        <br />
        <span className="bold">@pages</span>:指向当前项目的
        <span className="bold">src/pages</span>
        文件路径
        <br />
        若自行想添加别名，可以在
        <span className="bold">/config/webpack.config.js</span>文件，找到
        <span className="bold">alias</span>字样自行添加相应路径即可。 举例：
        <code>
          alias:
          {`{
  .....
  "@asset":path.join(paths.appSrc,"asset"),
}`}
        </code>
      </p>
      <div className="title">使用keep-alive对页面数据持久化</div>
      <p className="content">
        想要对页面的数据持久化，关闭页面下次打开不重新加载，可以在
        <span className="bold">src/router/route/index.js</span>配置加上
        <span className="bold">keepAlive: true</span>即可
      </p>
      <div className="title">添加导航栏</div>
      <p className="content" id="navigation">
        在当前项目
        <span className="bold">src/common/menu.js</span>
        按照格式添加菜单栏
      </p>
      <div className="title" id="router">
        页面添加路由
      </div>
      <p className="content">
        在当前项目
        <span className="bold">src/pages/</span>下完成页面编写后， 在
        <span className="bold">src/router/route/index.js</span>
        配置加上编写的组件，渲染的方式，对应的路由等等...
        <br />
        举例：
        <code>
          import Home from "@pages/home"; <br /> const routerList = [
          {`{
    ......
  }`}
          ,
          {`{
  path: "/home",
  keepAlive: true, // 页面数据持久化
  title: "主页",
  key: "Home",
  components: Home,// 导入的组件
}`}
          ] <br />
          export default routerList;
        </code>
      </p>
      <div className="title">更多内容还在努力完善</div>
    </div>
  );
}

export default Home;
