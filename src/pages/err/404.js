import React from "react";
import { Result, Button } from "antd";
import { connect } from "react-redux";
import menu from "@/common/menu";
import {
  addOpenedMenu,
  setOpenKey,
  setSelectKey,
  filterOpenKey,
} from "@/store/action";

const mapStateToProps = (state) => ({
  openMenus: state.global.openedMenu,
});

const mapDispatchToProps = (dispatch) => ({
  filterOpenKeyFn: (key) => dispatch(filterOpenKey(key)),
  setSelectKeyFn: (key) => dispatch(setSelectKey(key)),
  setOpenKeyFn: (key) => dispatch(setOpenKey(key)),
  addOpenedMenuFn: (key) => dispatch(addOpenedMenu(key)),
});

function Error404(props) {
  const {
    openMenus,
    history,
    filterOpenKeyFn,
    setSelectKeyFn,
    setOpenKeyFn,
    addOpenedMenuFn,
  } = props;
  console.log(props);
  const back = () => {
    // 顶部只有一个被打开
    if (openMenus.length === 1) {
      debugger
      filterOpenKeyFn(openMenus[0].key)
      let firstMenu = menu[0];
      if (firstMenu.children) {
        setOpenKeyFn([firstMenu.key]);
        setSelectKeyFn([firstMenu.children[0].key]);
        addOpenedMenuFn(firstMenu.children[0]);
        history.push(firstMenu.children[0].path);
        return;
      }
      setOpenKeyFn([firstMenu.key]);
      setSelectKeyFn([firstMenu.key]);
      addOpenedMenuFn(firstMenu);
      history.push(firstMenu.push);
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
