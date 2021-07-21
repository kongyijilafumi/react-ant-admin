import { useState } from "react";
import MyIcon from "../icon";
import { Button, Drawer, message, Row, Radio } from "antd";
import { connect } from "react-redux";
import { changeLayoutMode } from "@/store/layout/action";
import { setVisible } from "@/store/visibel/action";
import * as Types from "../../store/layout/actionTypes";
import { setLayoutMode, setCompVisibel as util_setCompVisibel } from "@/utils";
import singImg from "@/assets/images/layout2.jpg";
import twoImg from "@/assets/images/layout1.jpg";
import twoFlanksImg from "@/assets/images/layout3.jpg";
import "./index.less";
const modes = [
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
const mapDispatchToProps = (dispatch) => ({
  setMode: (mode) => dispatch(changeLayoutMode(mode)),
  setCompVisible: (key, val) => dispatch(setVisible(key, val)),
});
const mapStateToProps = (state) => ({
  layoutMode: state.layout,
  componentsVisible: state.componentsVisible,
});
function useLayoutSet({ setMode, layoutMode, componentsVisible }) {
  const [visible, setVisible] = useState(false);
  const wakeup = () => setVisible(true);
  const onClose = () => setVisible(false);
  const setLayout = (mode) => {
    setMode(mode);
    message.success("布局设置成功！");
  };
  const saveLayout = () => {
    setLayoutMode(layoutMode);
    util_setCompVisibel(componentsVisible);
    message.success("布局保存本地成功！");
  };

  return {
    wakeup,
    visible,
    onClose,
    setLayout,
    saveLayout,
  };
}

function LayoutSet(props) {
  const { wakeup, visible, onClose, setLayout, saveLayout } =
    useLayoutSet(props);
  const { componentsVisible = {}, setCompVisible } = props;
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
        visible={visible}
      >
        <h2 className="title">选择布局</h2>
        <Row justify="space-around">
          {modes.map((m) => (
            <div
              key={m.mode}
              onClick={() => setLayout(m.mode)}
              className={m.mode === props.layoutMode ? "col active" : "col"}
            >
              <img src={m.img} alt={m.alt}></img>
            </div>
          ))}
        </Row>
        <h2 className="title">组件显示</h2>
        {Object.keys(componentsVisible).map((key) => (
          <Row key={key} className="visibel-list">
            {key === "footer" ? "底部：" : "顶部切换导航："}
            <Radio.Group
              onChange={(e) => setCompVisible(key, e.target.value)}
              value={componentsVisible[key]}
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

export default connect(mapStateToProps, mapDispatchToProps)(LayoutSet);
