import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import MenuDnd from "@/components/menu-dnd";
import MyIcon from "@/components/icon";
import { withRouter } from "react-router-dom";
import { filterOpenKey } from "@/store/menu/action";
import {  reduceMenuList } from "@/utils";
import { message, Breadcrumb } from "antd";
import { getMenus } from "@/common";

const mapStateToProps = (state) => ({
  openedMenu: state.menu.openedMenu,
  childKey: state.menu.selectMenuKey,
});
const mapDispatchToProps = (dispatch) => ({
  filterKey: (key) => dispatch(filterOpenKey(key)),
});
function getParent(list, parentKey) {
  return list.find((i) => i.key === parentKey);
}
async function getBreadArray(ckey) {
  let res = await getMenus();
  let list = reduceMenuList(res.data);
  let arr = [];
  let currentInfo = list.find((i) => i.key === ckey);
  if (!currentInfo) return [];
  arr.unshift(currentInfo);
  let parentKey = currentInfo.parentKey;
  while (getParent(list, parentKey)) {
    let info = getParent(list, parentKey);
    arr.unshift(info);
    parentKey = info.parentKey;
  }
  return arr;
}

function TopMenu({ openedMenu, filterKey, history, childKey }) {
  const [breadArr, setBread] = useState([]);

  useEffect(() => {
    async function get() {
      let data = await getBreadArray(childKey[0]);
      setBread(data);
    }
    get();
  }, [childKey]);

  const closeTopMenu = useCallback(
    (path, nextItem, isCurrent) => {
      if (nextItem) {
        filterKey(path);
      } else {
        message.error("最后一个选项菜单不可关闭");
      }
      if (nextItem && isCurrent) {
        history.replace(nextItem.path);
      }
    },
    [history, filterKey]
  );

  return (
    <div className="top-menu-wrapper">
      {breadArr.length > 0 && (
        <Breadcrumb className="top-breadcrumb">
          {breadArr.map((i) => (
            <Breadcrumb.Item key={i.key}>
              <MyIcon type={i.icon} />
              <span className="title">{i.title}</span>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}

      <div className="top-menu">
        <MenuDnd
          currentKey={
            history.location.pathname +
            (history.location.hash || history.location.search)
          }
          rangeVal={openedMenu}
          onClose={closeTopMenu}
        />
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopMenu));
