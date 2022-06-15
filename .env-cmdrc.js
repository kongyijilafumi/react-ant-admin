const dev = {
  REACT_APP_ROUTERBASE: "/react-ant-admin",
  REACT_APP_API_BASEURL: "/api",
  REACT_APP_MODE: "development",
}
const pro = {
  REACT_APP_ROUTERBASE: "/react-ant-admin",
  REACT_APP_API_BASEURL: "/api",
  REACT_APP_MODE: "production"
}

module.exports = Promise.resolve({
  dev: dev,
  dev_mock: {
    ...dev,
    REACT_APP_MOCK: "1"
  },
  dev_color: {
    ...dev,
    REACT_APP_COLOR: "1"
  },
  build: pro
})