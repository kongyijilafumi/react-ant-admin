import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MenuDnd from "@/components/menu-dnd";
import MyIcon from "@/components/icon";
import { reduceMenuList } from "@/utils";
import { Breadcrumb } from "antd";
import { getMenus } from "@/common";

const mapStateToProps = (state) => ({
  childKey: state.menu.selectMenuKey,
});

function getParent(list, parentKey) {
  return list.find((i) => i[MENU_KEY] === parentKey);
}
async function getBreadArray(ckey) {
  let list = reduceMenuList(await getMenus());
  let arr = [];
  let currentInfo = list.find((i) => i[MENU_KEY] === ckey);
  if (!currentInfo) return [];
  arr.unshift(currentInfo);
  let parentKey = currentInfo[MENU_PARENTKEY], parentInfo;
  // eslint-disable-next-line 
  while (parentInfo = getParent(list, parentKey)) {
    arr.unshift(parentInfo);
    parentKey = parentInfo[MENU_PARENTKEY];
  }
  return arr;
}

function TopMenu({ childKey }) {
  const [breadArr, setBread] = useState([]);

  useEffect(() => {
    async function get() {
      let data = await getBreadArray(childKey[0]);
      setBread(data);
    }
    get();
  }, [childKey]);

  return (
    <div className="top-menu-wrapper">
      {breadArr.length > 0 && (
        <Breadcrumb className="top-breadcrumb">
          {breadArr.map((i) => (
            <Breadcrumb.Item key={i[MENU_KEY]}>
              <MyIcon type={i[MENU_ICON]} />
              <span className="title">{i[MENU_TITLE]}</span>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}

      <div className="top-menu">
        <MenuDnd />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(TopMenu);
