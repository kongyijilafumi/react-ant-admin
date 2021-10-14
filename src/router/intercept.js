import React from "react";
import { addOpenedMenu, setOpenKey, setSelectKey } from "@/store/menu/action";
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
  setInfo = async () => {
    const { title, pageKey, openMenus, history, setOpenKeys, setSelectedKeys } =
      this.props;
    if (!title) {
      return;
    }
    document.title = title;
    const pagePath =
      history.location.pathname +
      (history.location.hash || history.location.search);
    const findInfo = openMenus.find((i) => i.path === pagePath);
    setSelectedKeys([pageKey]);
    let openkey = await getMenuParentKey(pageKey);
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
      title,
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
      (m) => (m.parentPath || "") + m.path === path
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
