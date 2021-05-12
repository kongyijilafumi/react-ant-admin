import React, { useCallback, useState } from "react";
import { Drawer, Col, Row, message } from "antd";
import MyIcon from "@/components/icon";
import Color from "@/components/color";
import "./index.less";

const colorsData = [
  { title: "全局主色", key: "@primary-color", value: "#1890ff" },
  { title: "链接色", key: "@link-color", value: "#1890ff" },
  { title: "成功色", key: "@success-color", value: "#52c41a" },
  { title: "警告色", key: "@warning-color", value: "#faad14" },
  { title: "错误色", key: "@error-color", value: "#f5222d" },
  { title: "布局字体色", key: "@layout-text", value: "#fff" },
  {
    title: "布局背景色",
    key: "@layout-background",
    value: "rgba(0, 0, 0, 0.85)",
  },
  { title: "标题色", key: "@heading-color", value: "rgba(0, 0, 0, 0.85)" },
  { title: "主文本色", key: "@text-color", value: "rgba(0, 0, 0, 0.65)" },
  {
    title: "次文本色",
    key: "@text-color-secondary",
    value: "rgba(0, 0, 0, 0.45)",
  },
  { title: "失效色", key: "@disabled-color", value: "rgba(0, 0, 0, 0.25)" },
  { title: "边框色", key: "@border-color-base", value: "#d9d9d9" },
];
const getColor = (color) => ({
  background: color,
});
export default function SetTheme() {
  const [visible, setVisible] = useState(false);
  const [selectInfo, setInfo] = useState({});
  const [colorShow, setColorShow] = useState(false);
  const [colors, setColor] = useState(colorsData);
  // 关闭抽屉
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  // 显示抽屉
  const showDrawer = useCallback(() => {
    setVisible(true);
  }, []);

  const onChangeComplete = (v, k) => {
    let newColor = [...colors];
    newColor.forEach((i) => {
      if (i.key === k) {
        i.value = v.hex;
      }
    });
    let colorObj = {};
    newColor.forEach((i) => {
      colorObj[i.key] = i.value;
    });
    // const { rgb } = v;
    // const rgba = `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
    console.log(colorObj);
    window.less
      .modifyVars(colorObj)
      .then((res) => {
        console.log(res);
        message.success("修改主题色成功");
        setColor(newColor);
        onCloseColor();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 选中
  const onSelect = useCallback((e, info) => {
    const height = window.innerHeight;
    let { clientX: pageX, clientY: pageY } = e;
    if (pageY + 310 > height) {
      pageY -= 320;
    }
    console.log(e);
    setInfo({ ...info, pageX, pageY });
    setColorShow(true);
  }, []);

  // 关闭色板
  const onCloseColor = useCallback(() => {
    setInfo({});
    setColorShow(false);
  }, []);

  return (
    <div className="set-theme">
      <div className="icon" onClick={showDrawer}>
        <MyIcon type="icon_pen" />
      </div>
      <Drawer
        className="drawer"
        title="设置主题颜色"
        placement="right"
        closable={false}
        onClose={onClose}
        width={400}
        visible={visible}
        onClick={onCloseColor}
      >
        {colors.map((i) => (
          <Row className="color-row" key={i.key}>
            <Col>{i.title}:</Col>
            <Col
              className="color-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(e, i);
              }}
              style={getColor(i.value)}
            ></Col>
          </Row>
        ))}
        <Color
          pageX={selectInfo.pageX}
          pageY={selectInfo.pageY}
          color={selectInfo.value}
          colorKey={selectInfo.key}
          onSureChange={onChangeComplete}
          onClose={onCloseColor}
          isShow={colorShow}
        />
      </Drawer>
    </div>
  );
}
