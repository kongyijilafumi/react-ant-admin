import React from "react";
import { Result, Button } from "antd";
import { connect } from "react-redux";
import { getDefaultMenu } from "@/utils";
import {
  addOpenedMenu,
  setOpenKey,
  setSelectKey,
  filterOpenKey,
  setOpenMenu,
} from "@/store/action";

const mapStateToProps = (state) => ({
  openMenus: state.global.openedMenu,
});

const mapDispatchToProps = (dispatch) => ({
  filterOpenKeyFn: (key) => dispatch(filterOpenKey(key)),
  setSelectKeyFn: (key) => dispatch(setSelectKey(key)),
  setOpenKeyFn: (key) => dispatch(setOpenKey(key)),
  addOpenedMenuFn: (key) => dispatch(addOpenedMenu(key)),
  setOpenMenuFn: (key) => dispatch(setOpenMenu(key)),
});

function Error404(props) {
  const {
    openMenus,
    history,
    filterOpenKeyFn,
    setSelectKeyFn,
    setOpenKeyFn,
    addOpenedMenuFn,
    setOpenMenuFn,
  } = props;
  console.log(props);
  const back = () => {
    // 顶部只有一个被打开
    if (openMenus.length === 1) {
      const defaultMenu = getDefaultMenu();
      console.log(defaultMenu);
      setSelectKeyFn(defaultMenu.selectKey);
      setOpenKeyFn(defaultMenu.openKeys);
      setOpenMenuFn(defaultMenu.openedMenu);
      history.push(defaultMenu.openedMenu[0].path);
      return;
    }
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={back}>
          返回
        </Button>
      }
    />
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Error404);
