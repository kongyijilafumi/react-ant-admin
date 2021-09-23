import loadable from "@loadable/component";
import { Spin } from "antd";

const loaddingCom = (
  <Spin
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 20,
      fontSize: 14,
    }}
    tip="组件加载中...."
  />
);
const Line = loadable(() => import("./line"), { fallback: loaddingCom });
const Bar = loadable(() => import("./bar"), { fallback: loaddingCom });
const Pie = loadable(() => import("./pie"), { fallback: loaddingCom });

export { Line, Bar, Pie };
