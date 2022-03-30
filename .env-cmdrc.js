
const devConfig = {
  PORT: 3000, // 启动端口
  HOST: "0.0.0.0", // 监听地址
  NODE_ENV: "development", // 开发者模式
  REACT_APP_ROUTERBASE: "/react-ant-admin", // react路由基础路径
  REACT_APP_API_BASEURL: "http://127.0.0.1:8081/api/react-ant-admin", //请求地址
  PUBLIC_URL: "/react-ant-admin",// 静态文件路径
}
const productionCfg = {
  REACT_APP_ROUTERBASE: "/react-ant-admin", // react路由基础路径
  REACT_APP_API_BASEURL: "/api/react-ant-admin", //请求地址
  PUBLIC_URL: "/react-ant-admin",// 静态文件路径
  NODE_ENV: "production", // 打包模式 生产模式
  BUILD_PATH: "react-ant-admin", // 打包 文件夹名称
}
module.exports = Promise.resolve({

  // 本地接口正常运行 没有mock 没有 主题色
  development: devConfig,

  // 本地接口  启用主题色运行
  development_color: {
    ...devConfig,
    COLOR: "true", // "true" 为 启动
  },

  // 本地mock  运行
  development_mock: {
    ...devConfig,
    REACT_APP_MOCK: "1", // 1 为开启mock
  },

  // 主题色 和 本地mock  运行
  development_color_mock: {
    ...devConfig,
    COLOR: "true",
    REACT_APP_MOCK: "1",
  },

  // 打包 ：无主题 无mock
  production: productionCfg,

  // 打包 ： 有主题 无mock
  production_color: {
    ...productionCfg,
    COLOR: "true", // "true" 为 启动
  },

  // 打包 ： 有主题 有mock  纯本地模式打包
  production_color_mock: {
    ...productionCfg,
    COLOR: "true",
    REACT_APP_MOCK: "1",
  },

  // GitHub pages 打包  博主使用
  production_github: {
    ...productionCfg,
    COLOR: "true",
    REACT_APP_API_BASEURL: "https://azhengpersonalblog.top/api/react-ant-admin",
    REACT_APP_ROUTER_ISHASH: "1", // 启用哈希模式 
    REACT_APP_ROUTERBASE: "/"
  }
})