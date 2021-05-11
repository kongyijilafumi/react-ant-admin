import React, { useCallback, useState } from "react";
import { Drawer } from "antd";
import MyIcon from "@/components/icon";
import "./index.less";
export default function SetTheme() {
  const [visible, setVisible] = useState(false);
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);
  const showDrawer = useCallback(() => {
    setVisible(true);
  }, []);
  return (
    <div>
      <div className="set-theme" onClick={showDrawer}>
        <MyIcon type="icon_pen" />
      </div>
      <Drawer
        title="设置主题颜色"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}
