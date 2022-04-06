import React from "react";
import { addOpenedMenu, setOpenKey, setSelectKey, setCurrentPath } from "@/store/menu/action";
import { connect } from "react-redux";
import { getMenuParentKey } from "@/utils";
import Error from "@pages/err";
import { Spin } from "antd";

const mapStateToProps = (state) => ({
  openMenus: state.menu.openedMenu,
});

const mapDispatchToProps = (dispatch) => ({
  addOpenedMenuFn: (val) => dispatch(addOpenedMenu(val)),
  setSelectedKeys: (val) => dispatch(setSelectKey(val)),
  setOpenKeys: (val) => dispatch(setOpenKey(val)),
  setPath: (path) => dispatch(setCurrentPath(path))
});

class Intercept extends React.Component {
  // eslint-disable-next-line
  constructor() {
    super(...arguments);
    if (this.props.cacheLifecycles) {
      this.props.cacheLifecycles.didRecover(this.componentDidRecover);
    }
  }
  componentDidMount() {
    this.setInfo();
    this.scrollToTop();
  }
  setInfo = () => {
    const { [MENU_TITLE]: title, pageKey, openMenus, history, setOpenKeys, setSelectedKeys, setPath, menuList } =
      this.props;
    if (!title) {
      return;
    }
    const { pathname, hash, search } = history.location
    document.title = title;
    const pagePath = pathname + (hash || search);
    const findInfo = openMenus.find((i) => i.path === pagePath);
    setPath(pagePath)
    setSelectedKeys([String(pageKey)]);
    let openkey = getMenuParentKey(menuList, pageKey);
    setOpenKeys(openkey);
    this.addMenus(findInfo, pageKey, pagePath, title);
  };
  //
  componentDidRecover = () => {
    this.setInfo();
    this.scrollToTop();
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  addMenus = (info, key, path, title) => {
    if (!info) {
      this.props.addOpenedMenuFn({
        key,
        path,
        title,
      });
    }
  };

  fellbackStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 500,
    fontSize: 24,
  };

  render() {
    const {
      path,
      [MENU_TITLE]: title,
      pageKey,
      openMenus,
      setOpenKeys,
      setSelectedKeys,
      addOpenedMenuFn,
      menuList,
      components: Components,
      ...itemProps
    } = this.props;
    const hasPath = !menuList.find(
      (m) => (m[MENU_PARENTPATH] || "") + m[MENU_PATH] === path
    );
    if (hasPath && path !== "/" && path !== "*") {
      return (
        <Error
          {...itemProps}
          status="403"
          errTitle="权限不够"
          subTitle="Sorry, you are not authorized to access this page."
        />
      );
    }
    return (
      <Components
        {...itemProps}
        fallback={<Spin style={this.fellbackStyle} tip="页面加载中...." />}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intercept);
