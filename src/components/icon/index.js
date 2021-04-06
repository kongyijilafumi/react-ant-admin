import { createFromIconfontCN } from "@ant-design/icons";

const MyIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2467607_90g9u5jzoz.js", // 在 iconfont.cn 上生成
});

export default function Icon({ type }) {
  if (!type) return null;
  return <MyIcon type={type} />;
}
