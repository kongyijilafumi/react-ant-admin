import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import MenuDnd from "@/components/menu-dnd";
import MyIcon from "@/components/icon";
import { withRouter } from "react-router-dom";
import { filterOpenKey } from "@/store/action";
import { getCurrentUrl, reduceMenuList } from "@/utils";
import { message, Breadcrumb } from "antd";
import { getMenus } from "@/common";

const mapStateToProps = (state) => ({
  openedMenu: state.global.openedMenu,
  childKey: state.global.selectMenuKey,
});
const mapDispatchToProps = (dispatch) => ({
  filterKey: (key) => dispatch(filterOpenKey(key)),
});
function getParent(list, parentKey) {
  return list.find((i) => i.key === parentKey);
}
async function getBreadArray(ckey) {
  let list = await getMenus();
  list = reduceMenuList(list);
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
        let parentPath = nextItem.parentPath || "";
        history.replace(parentPath + nextItem.path);
      }
    },
    [history, filterKey]
  );

  const gotoMenuUrl = useCallback(
    (item) => {
      if (item.path === getCurrentUrl()) return;
      let parentPath = item.parentPath || "";
      history.replace(parentPath + item.path);
    },
    [history]
  );

  return (
    <div>
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
          currentKey={getCurrentUrl()}
          rangeVal={openedMenu}
          onClose={closeTopMenu}
          onChoose={gotoMenuUrl}
        />
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopMenu));
