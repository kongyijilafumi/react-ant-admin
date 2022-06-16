import { createFromIconfontCN } from "@ant-design/icons";
import * as React from 'react';
import iconfont from "/public/iconfont.js?url"
const MyIcon = createFromIconfontCN({
  scriptUrl: iconfont, // 在 iconfont.cn 上生成
});

interface IconProps extends React.HTMLProps<HTMLSpanElement> {
  type: string
}
export default function Icon({ type, ...itemProps }: IconProps): React.ReactElement | null {
  if (!type) return null;
  return <MyIcon type={type} {...itemProps} />;
}
