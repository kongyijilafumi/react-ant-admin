import React from "react";
import { Result, Button } from "antd";
import { connect } from "react-redux";
import { getDefaultMenu, getCurrentUrl } from "@/utils";
import { filterOpenKey } from "@/store/action";

const mapStateToProps = (state) => ({
  openMenus: state.global.openedMenu,
});

const mapDispatchToProps = (dispatch) => ({
  filterOpenKeyFn: (key) => dispatch(filterOpenKey(key)),
});

function ErrorTemplate(props) {
  const {
    openMenus,
    history,
    filterOpenKeyFn,
    status = "404",
    title = "404",
    subTitle = "Sorry, the page you visited does not exist.",
  } = props;
  const back = async () => {
    const path = getCurrentUrl();
    // 顶部一个或以下被打开
    if (openMenus.length <= 1) {
      filterOpenKeyFn(path);
      const defaultMenu = await getDefaultMenu();
      history.replace(defaultMenu.openedMenu[0].path);
      return;
    }
    // 从顶部打开的路径，再去跳转
    const menuList = openMenus.filter((i) => i.path !== path);
    filterOpenKeyFn(path);
    const next = menuList[menuList.length - 1];
    history.replace(next.path);
  };
  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={back}>
          Go Back
        </Button>
      }
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorTemplate);
