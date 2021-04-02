import React from "react";
import { Result, Button } from "antd";
import { connect } from "react-redux";
import { getDefaultMenu } from "@/utils";
import {
  setOpenKey,
  setSelectKey,
  filterOpenKey,
  setOpenMenu,
} from "@/store/action";

const mapStateToProps = (state) => ({
  openMenus: state.global.openedMenu,
  selectMenuKey: state.global.selectMenuKey,
});

const mapDispatchToProps = (dispatch) => ({
  filterOpenKeyFn: (key) => dispatch(filterOpenKey(key)),
  setSelectKeyFn: (key) => dispatch(setSelectKey(key)),
  setOpenKeyFn: (key) => dispatch(setOpenKey(key)),
  setOpenMenuFn: (key) => dispatch(setOpenMenu(key)),
});

function Error404(props) {
  const {
    openMenus,
    history,
    filterOpenKeyFn,
    setSelectKeyFn,
    setOpenKeyFn,
    selectMenuKey,
    setOpenMenuFn,
  } = props;
  const back = () => {
    // 顶部一个或以下被打开
    if (openMenus.length <=1) {
      const defaultMenu = getDefaultMenu();
      setSelectKeyFn(defaultMenu.selectKey);
      setOpenKeyFn(defaultMenu.openKeys);
      setOpenMenuFn(defaultMenu.openedMenu);
      history.replace(defaultMenu.openedMenu[0].path);
      return;
    }
    // 从顶部打开的路径，再去跳转
    const menuList = openMenus.filter((i) => i.key !== selectMenuKey[0]);
    filterOpenKeyFn(selectMenuKey[0]);
    const next = menuList[menuList.length - 1];
    setOpenKeyFn([next.parentKey]);
    setSelectKeyFn([next.key]);
    history.replace(next.path);
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={back}>
          Go Back
        </Button>
      }
    />
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Error404);
