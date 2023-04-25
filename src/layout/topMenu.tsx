import { useEffect, useMemo, useState } from "react";
import MenuDnd from "@/components/menu-dnd";
import MyIcon from "@/components/icon";
import { reduceMenuList } from "@/utils";
import { Breadcrumb } from "antd";
import { getMenus } from "@/common";
import { MenuItem, MenuList } from "@/types"
import { useStateSelectMenuKey } from "@/store/hooks";
import { useStyle } from "./style";


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
  const { styles } = useStyle()
  useEffect(() => {
    async function get() {
      let data = await getBreadArray(selectMenuKey[0]);
      setBread(data);
    }
    get();
  }, [selectMenuKey]);

  const breadcrumbItems = useMemo(() => {
    if (breadArr.length) {
      return breadArr.map(
        (i) => ({
          title: <>
            <MyIcon type={i[MENU_ICON]} />
            <span className="title">{i[MENU_TITLE]}</span>
          </>,
        })
      )
    }
    return []
  }, [breadArr])

  return (
    <div className="top-menu-wrapper">
      {breadArr.length > 0 && (
        <Breadcrumb
          className={styles.topBreadcrumb}
          items={breadcrumbItems}>
        </Breadcrumb>
      )}

      <div className={styles.topMenu}>
        <MenuDnd />
      </div>
    </div>
  );
}

export default TopMenu;
