import axios, { AxiosResponse, AxiosError } from "axios";
import { message, notification } from "antd";
import { getToken, clearLocalDatas, USER_INFO, TOKEN, MENU } from "@/utils";
import qs from "qs"
import store from "@/store";
import { clearUser } from "@/store/action";
// 请求地址
const BASE_URL = import.meta.env.REACT_APP_API_BASEURL || "/api/react-ant-admin";


// 错误信息
const codeMessage: { [key: number]: string } = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

// 请求配置文件
const config = {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: BASE_URL,

  timeout: 1000 * 15,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false,

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 3,
  headers: {
    "Content-Type": " application/json;charset=UTF-8",
  },
};

// 创建ajax实例
const instance = axios.create(config);
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    let token = getToken();
    if (token) {
      config.headers["authorization"] = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response.data) {
      let { msg, status } = response.data;
      if (status === 1) {
        message.error(msg);
      }
    }
    return response && response.data;
  },
  function (error: AxiosError) {
    const { response } = error;
    if (response && response.status) {
      const errorText = codeMessage[response.status] || response.statusText;
      const { status, config } = response;
      notification.error({
        message: `请求错误 ${status}: ${config.url}`,
        description: errorText,
      });
      if (response.status === 401 || response.status === 403) {
        clearLocalDatas([USER_INFO, TOKEN, MENU]);
        store.dispatch(clearUser())
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } else if (!response) {
      notification.error({
        description: "客户端异常或网络问题，请清除缓存！",
        message: "状态异常",
      });
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

const rewriteGet = instance.get
instance.get = function (url: string, data: any, ...any) {
  let query: string = qs.stringify(data, { addQueryPrefix: true });
  return rewriteGet(url + query, ...any)
}

export default instance;
