import { useCallback, useState } from "react";
import MyIcon from "../icon";
import { Button, Drawer, message, Row, Radio } from "antd";
import { changeLayoutMode, setVisible } from "@/store/action";
import * as Types from "@/store/layout/actionTypes";
import { setLayoutMode, setCompVisible as util_setCompVisible } from "@/utils";
import singImg from "@/assets/images/layout2.jpg";
import twoImg from "@/assets/images/layout1.jpg";
import twoFlanksImg from "@/assets/images/layout3.jpg";
import { LayoutMode, State, LayoutModes } from "@/types"
import "./index.less";
import { useSelector, useDispatch } from "react-redux";
import { getStateLayout, getStateVisible } from "@/store/getter";

interface LayoutSetProps {
  setMode: (s: LayoutMode) => void
  layoutMode: LayoutMode
  componentsVisible: State["componentsVisible"]
  setCompVisible: (k: keyof State["componentsVisible"], val: boolean) => void
}

const modes: LayoutModes = [
  {
    img: singImg,
    mode: Types.SINGLE_COLUMN,
    alt: "单列布局",
  },
  {
    img: twoImg,
    mode: Types.TWO_COLUMN,
    alt: "两列布局",
  },
  {
    img: twoFlanksImg,
    mode: Types.TWO_FLANKS,
    alt: "两侧布局",
  },
];
const RadioArray = [
  {
    l: "显示",
    v: true,
  },
  {
    l: "隐藏",
    v: false,
  },
];

function LayoutSet(props: LayoutSetProps) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const layoutMode = useSelector(getStateLayout)
  const wakeup = useCallback(() => setDrawerVisible(true), []);
  const onClose = useCallback(() => setDrawerVisible(false), []);
  const componentsVisible = useSelector(getStateVisible)
  const dispatch = useDispatch()
  const setCompVisible = useCallback((key: keyof State["componentsVisible"], val: boolean) => dispatch(setVisible(key, val)), [dispatch])
  const setLayout = useCallback((mode: LayoutMode) => {
    dispatch(changeLayoutMode(mode))
    message.success("布局设置成功！");
  }, [dispatch])
  const saveLayout = useCallback(() => {
    setLayoutMode(layoutMode);
    util_setCompVisible(componentsVisible);
    message.success("布局保存本地成功！");
  }, [layoutMode, componentsVisible])
  return (
    <div className="layoutset-container">
      <MyIcon type="icon_setting" onClick={wakeup} />
      <Drawer
        className="layoutset-drawer"
        title="设置布局"
        placement="right"
        closable={false}
        onClose={onClose}
        width={300}
        visible={drawerVisible}
      >
        <h2 className="title">选择布局</h2>
        <Row justify="space-around">
          {modes.map((m) => (
            <div
              key={m.mode}
              onClick={() => setLayout(m.mode)}
              className={m.mode === props.layoutMode ? "col active" : "col"}
            >
              <img src={m.img} alt={m.alt + m.mode + props.layoutMode}></img>
            </div>
          ))}
        </Row>
        <h2 className="title">组件显示</h2>
        {Object.keys(componentsVisible).map((key) => (
          <Row key={key} className="visible-list">
            {key === "footer" ? "底部：" : "顶部切换导航："}
            <Radio.Group
              onChange={(e) => setCompVisible(key as keyof State["componentsVisible"], e.target.value)}
              value={componentsVisible[key as keyof State["componentsVisible"]]}
            >
              {RadioArray.map((i) => (
                <Radio value={i.v} key={i.l}>
                  {i.l}
                </Radio>
              ))}
            </Radio.Group>
          </Row>
        ))}
        <Row className="save" justify="center">
          <Button type="primary" onClick={saveLayout}>
            保存此布局
          </Button>
        </Row>
      </Drawer>
    </div>
  );
}

export default LayoutSet
