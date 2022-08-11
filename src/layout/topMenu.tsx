import { useEffect, useState } from "react";
import MenuDnd from "@/components/menu-dnd";
import MyIcon from "@/components/icon";
import { reduceMenuList } from "@/utils";
import { Breadcrumb } from "antd";
import { getMenus } from "@/common";
import { MenuItem, MenuList } from "@/types"
import { useStateSelectMenuKey } from "@/store/hooks";


function getParent(list: MenuList, parentKey: string): MenuItem | undefined {
  return list.find((i) => i.key === parentKey);
}

async function getBreadArray(ckey: string) {
  let list = reduceMenuList(await getMenus());
  let arr = [];
  let currentInfo = list.find((i) => i.key === ckey);
  if (!currentInfo) return [];
  arr.unshift(currentInfo);
  let parentKey = currentInfo.parentKey;
  let info;
  while (!!(info = getParent(list, parentKey))) {
    arr.unshift(info);
    parentKey = info.parentKey;
  }
  return arr;
}

const InitData: MenuItem[] = []

function TopMenu() {
  const [breadArr, setBread] = useState(InitData);
  const selectMenuKey = useStateSelectMenuKey()
  useEffect(() => {
    async function get() {
      let data = await getBreadArray(selectMenuKey[0]);
      setBread(data);
    }
    get();
  }, [selectMenuKey]);



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

export default TopMenu;
