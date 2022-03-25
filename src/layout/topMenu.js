import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MenuDnd from "@/components/menu-dnd";
import MyIcon from "@/components/icon";
import { withRouter } from "react-router-dom";
import { reduceMenuList } from "@/utils";
import { Breadcrumb } from "antd";
import { getMenus } from "@/common";

const mapStateToProps = (state) => ({
  childKey: state.menu.selectMenuKey,
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
            <Breadcrumb.Item key={i.key}>
              <MyIcon type={i.icon} />
              <span className="title">{i.title}</span>
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

export default connect(mapStateToProps, null)(withRouter(TopMenu));
