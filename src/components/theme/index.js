import React, { useCallback, useState } from "react";
import { Drawer, Col, Row, message } from "antd";
import MyIcon from "@/components/icon";
import Color from "@/components/color";
import "./index.less";

const getColor = (color) => ({
  background: color,
});
export default function SetTheme() {
  const [visible, setVisible] = useState(false);
  const [selectInfo, setInfo] = useState({});
  const [colorShow, setColorShow] = useState(false);
  const [colors, setColor] = useState(process.env.varColors);
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
    console.log(v);
    newColor.forEach((i) => {
      if (i.key === k) {
        i.value = v.hex;
      }
    });
    let colorObj = {};
    newColor.forEach((i) => {
      colorObj[i.key] = i.value;
    });
    window.less
      .modifyVars(colorObj)
      .then((res) => {
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
    if (pageY + 350 > height) {
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
