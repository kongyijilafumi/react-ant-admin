import React from "react";
import { addOpenedMenu, setOpenKey, setSelectKey } from "@/store/action";
import { connect } from "react-redux";
import { getCurrentUrl, getMenuParentKey } from "@/utils";

const mapStateToProps = (state) => ({
  openMenus: state.global.openedMenu,
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
    this.setInfo(true);
  }
  setInfo = () => {
    const {
      title,
      pageKey,
      openMenus,
      setOpenKeys,
      setSelectedKeys,
    } = this.props;
    document.title = title;
    const pagePath = getCurrentUrl();
    const findInfo = openMenus.find((i) => i.path === pagePath);
    setSelectedKeys([pageKey]);
    let openkey = getMenuParentKey(pageKey);
    openkey = openkey ? [openkey] : [];
    setOpenKeys(openkey);
    this.addMenus(findInfo, pageKey, pagePath, title);
  };
  //
  componentDidRecover = () => {
    this.setInfo();
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

  render() {
    const {
      title,
      pageKey,
      openMenus,
      setOpenKeys,
      path,
      setSelectedKeys,
      addOpenedMenuFn,
      components: Components,
      ...itemProps
    } = this.props;
    return <Components pageKey={pageKey} {...itemProps} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intercept);
