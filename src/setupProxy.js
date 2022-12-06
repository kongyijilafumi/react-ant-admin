const { createProxyMiddleware } = require("http-proxy-middleware");

const matchUrl = "/api"; // 请求是匹配的地址
const target = "https://z3web.cn/"; // 目标网址
const prevUrl = "^/api"; // 以/api路径截取
const writeUlr = "/api/react-ant-admin"; // 重写请求路径  
/**
 * 在使用 本地代理转发 请将 src/common/ajax.js axios的config baseURL 置为"/"
 * 假设本地 ajax 请求以/api开头，将去请求 目标网址 target
 * ajax.post("/api/getlist") 将/api 重写为 /api/react-ant-admin 
 * 然后拼接 https://z3web.cn/
 * 如：ajax.post("/api/getlist") => https://z3web.cn/api/react-ant-admin/getlist
 */

module.exports = function (app) {
  app.use(
    createProxyMiddleware(matchUrl, {
      target,
      changeOrigin: true, 
      secure: true,// https
      pathRewrite: { [prevUrl]: writeUlr },
    })
  );
};
