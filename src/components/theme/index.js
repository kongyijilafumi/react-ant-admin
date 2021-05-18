import React, { useCallback, useEffect, useState } from "react";
import { Drawer, Col, Row, message, Button } from "antd";
import MyIcon from "@/components/icon";
import Color from "@/components/color";
import { getTheme, saveTheme } from "@/utils";
import "./index.less";

const getColor = (color) => ({
  background: color,
});
const localTheme = getTheme();
export default function SetTheme() {
  const [visible, setVisible] = useState(false);
  const [selectInfo, setInfo] = useState({});
  const [colorShow, setColorShow] = useState(false);
  const [colors, setColor] = useState(localTheme || process.env.varColors);

  // 关闭色板
  const onCloseColor = useCallback(() => {
    setInfo({});
    setColorShow(false);
  }, []);

  // 设置主题
  const setTheme = useCallback(
    (obj, list, tip = true) => {
      window.less
        .modifyVars(obj)
        .then((res) => {
          tip && message.success("修改主题色成功");
          setColor(list);
          onCloseColor();
        })
        .catch((err) => {
          tip && message.error("修改失败");
        });
    },
    [onCloseColor]
  );
  // 初始化主题
  useEffect(() => {
    saveTheme();
    if (localTheme) {
      setTheme(
        localTheme.reduce((a, c) => {
          a[c.key] = c.value;
          return a;
        }, {}),
        localTheme,
        false
      );
    }
    // eslint-disable-next-line
  }, []);

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
    setTheme(colorObj, newColor);
  };

  // 选中
  const onSelect = useCallback((e, info) => {
    const height = window.innerHeight;
    let { clientX: pageX, clientY: pageY } = e;
    if (pageY + 350 > height) {
      pageY -= 320;
    }
    setInfo({ ...info, pageX, pageY });
    setColorShow(true);
  }, []);
  
  // 保存本地
  const saveLocalTheme = useCallback(() => {
    saveTheme(colors);
    message.success("主题成功保存到本地！");
  }, [colors]);

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

        <Row justify="center">
          <Button type="primary" onClick={saveLocalTheme}>
            保存本地
          </Button>
        </Row>
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
