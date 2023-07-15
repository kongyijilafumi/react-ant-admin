
const devConfig = {
  PORT: 3000, // 启动端口
  HOST: "0.0.0.0", // 监听地址
  REACT_APP_ROUTERBASE: "/react-ant-admin", // react路由基础路径
  REACT_APP_API_BASEURL: "http://127.0.0.1:8081/api/react-ant-admin", //请求地址
  PUBLIC_URL: "/react-ant-admin",// 静态文件路径
}
const proConfig = {
  REACT_APP_ROUTERBASE: "/react-ant-admin", // react路由基础路径
  REACT_APP_API_BASEURL: "/api/react-ant-admin", //请求地址
  PUBLIC_URL: "/react-ant-admin",// 静态文件路径
  BUILD_PATH: "react-ant-admin", // 打包 文件夹名称
}

/**
 * env-cmd  文档地址 https://github.com/toddbluhm/env-cmd#-help
 * 命令行使用: env-cmd --verbose -e mode_name node file.js  
 * mode_name: 对应 mode 里面的 属性(key) 例如 development development_color
 * 运行结果：
 * 取出 对应 mode_name 的 值(value) Object.keys方法 把 key-value 绑定到 process.env 上
 * 如 : development(mode_name): { test : "123" }  => process.env.test = "123"
 * 最终能够在整个项目中 使用 process.env.test
 */
const mode = {

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
  production: proConfig,

  // 打包 ： 有主题 无mock
  production_color: {
    ...proConfig,
    COLOR: "true", // "true" 为 启动
  },

  // 打包 ： 有主题 有mock  纯本地模式打包
  production_color_mock: {
    ...proConfig,
    COLOR: "true",
    REACT_APP_MOCK: "1",
  },

  // GitHub pages 打包  博主使用
  production_github: {
    ...proConfig,
    COLOR: "true",
    REACT_APP_API_BASEURL: "https://z3web.cn/api/react-ant-admin",
    REACT_APP_ROUTER_ISHASH: "1", // 启用哈希模式 
    REACT_APP_ROUTERBASE: "/"
  }
}


module.exports = Promise.resolve(mode)