const dev = {
  REACT_APP_ROUTERBASE: "/react-ant-admin",
  REACT_APP_API_BASEURL: "/api",
  REACT_APP_MODE: "development",
}
const REACT_APP_ROUTER_ISHASH = "1"
const pro = {
  REACT_APP_ROUTERBASE: "/react-ant-admin",
  REACT_APP_API_BASEURL: "/api",
  REACT_APP_MODE: "production"
}
const REACT_APP_MOCK = "1"
const REACT_APP_COLOR = "1"

module.exports = Promise.resolve({
  dev: dev,
  dev_mock: {
    ...dev,
    REACT_APP_MOCK
  },
  dev_color: {
    ...dev,
    REACT_APP_COLOR
  },
  build: pro,
  build_color: {
    ...pro,
    REACT_APP_COLOR
  }
})