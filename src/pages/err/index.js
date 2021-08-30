import React from "react";
import { Result, Button } from "antd";
import { connect } from "react-redux";
import { getDefaultMenu } from "@/utils";
import { filterOpenKey } from "@/store/menu/action";

const mapStateToProps = (state) => ({
  openMenus: state.menu.openedMenu,
});

const mapDispatchToProps = (dispatch) => ({
  filterOpenKeyFn: (key) => dispatch(filterOpenKey(key)),
});

function useErrorPage(props) {
  const {
    openMenus,
    history,
    filterOpenKeyFn,
    status = "404",
    errTitle = "404",
    subTitle = "Sorry, the page you visited does not exist.",
  } = props;
  const back = async () => {
    const url =
      history.location.pathname +
      (history.location.hash || history.location.search);
    // 顶部一个或以下被打开
    if (openMenus.length <= 1) {
      filterOpenKeyFn(url);
      const defaultMenu = await getDefaultMenu();
      if (defaultMenu.openedMenu.length === 0) return history.replace("/");
      let { parentPath, path } = defaultMenu.openedMenu[0];
      history.replace(parentPath + path);
      return;
    }
    // 从顶部打开的路径，再去跳转
    const menuList = openMenus.filter((i) => i.path !== url);
    filterOpenKeyFn(url);
    const next = menuList[menuList.length - 1];
    history.replace(next.path);
  };
  return { status, errTitle, subTitle, back };
}

function ErrorPage(props) {
  const { status, errTitle, subTitle, back } = useErrorPage(props);
  return (
    <Result
      status={status}
      title={errTitle}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={back}>
          Go Back
        </Button>
      }
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
