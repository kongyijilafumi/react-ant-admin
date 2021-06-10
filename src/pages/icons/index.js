import React, { useState } from "react";
import { Input, Row, Col } from "antd";
import MyIcon from "@/components/icon";
import "./index.less";
const iconData = require("@/assets/json/iconfont");
const prefix_name = iconData.css_prefix_text;
const initData = iconData.glyphs.map((item) => ({
  ...item,
  type: prefix_name + item.font_class,
}));

function useIcons() {
  const [icons, setIcons] = useState(initData);
  const change = (e) => {
    const val = e.target.value;
    if (!val || !val.replace(/\s/g, "")) {
      setIcons(initData);
      return;
    }
    const newData = initData.filter((i) => i.name.includes(val));
    setIcons(newData);
  };
  return { change, icons };
}

export default function Icons() {
  const { change, icons } = useIcons();
  return (
    <div className="icons-container">
      <h2>Icon自定义</h2>
      <div className="mt10">你可以使用ant-design的语义化的矢量图形。</div>
      <div className="mt10">
        另外，你可以在
        <a href="https://www.iconfont.cn/" target="_blank" rel="noreferrer">
          iconfont
        </a>
        上添加自定义图标，在用createFromIconfontCN创建的组件上使用type="*"即可
      </div>
      <Row className="mt10">
        <Col span={8}>
          <Input placeholder="搜索本地相关图标库" onChange={change} />
        </Col>
      </Row>
      <Row className="mt10 pd10">
        {icons.map((item) => {
          return (
            <Col span={2} className="icon-item" key={item.icon_id}>
              <MyIcon type={item.type} />
              <div>{item.type}</div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

Icons.route = { path: "/icons" };