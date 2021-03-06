import { createFromIconfontCN } from "@ant-design/icons";

const MyIcon = createFromIconfontCN({
  scriptUrl: process.env.PUBLIC_URL+"/iconfont.js", // ε¨ iconfont.cn δΈηζ "//at.alicdn.com/t/font_2467607_sf5ou36jx9q.js"
});

export default function Icon({ type, ...itemProps }) {
  if (!type) return null;
  return <MyIcon type={type} {...itemProps} />;
}
