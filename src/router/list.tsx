import auto from "./auto";
import { Navigate } from "react-router-dom";
import Error from "@/pages/err"

export interface RouterInfo {
  components: React.ReactNode
  [MENU_PATH]: string
  [MENU_KEY]?: any
  [MENU_TITLE]?: string | any
  [MENU_KEEPALIVE]?: string | any
  [name: string]: any
}

const defaultArr: RouterInfo[] = [
  {
    [MENU_PATH]: "/",
    [MENU_KEY]: "index",
    components: <Navigate to="/details/person" replace />,
  },
  {
    [MENU_PATH]: "/result/404",
    components: <Error />,
  },
  {
    [MENU_PATH]: "/result/403",
    components: <Error status="403" errTitle="403" subTitle="Sorry, you don't have access to this page." />,
  },
  {
    [MENU_PATH]: "/result/500",
    components: <Error status="500" errTitle="500" subTitle="Sorry, the server is reporting an error." />,
  },
  {
    [MENU_PATH]: "*",
    [MENU_TITLE]: "页面不存在",
    [MENU_KEY]: "404",
    components: <Error />,
  },
];

const list: RouterInfo[] = [...auto, ...defaultArr]


export default list;
