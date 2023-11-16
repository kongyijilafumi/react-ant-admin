import { getMenus, } from "@/common";
import { MenuItem, MenuList, UserInfo, LayoutMode, MenuResponse, State, MenuMap } from "@/types"
export const USER_INFO = "USER_INFO";
export const TOKEN = "REACT_ADMIN_TOKEN";
export const MENU = "MENU";
export const VISIBLE = "COMPONENTS_VISIBLE";
export const LAYOUT_MODE = "LAYOUT_MODE";

interface MenuOpenData {
  openKeys: string[]
  selectKey: string[]
  openedMenu: MenuItem[]
}
type Token = string | null | undefined

// 获取默认页面
async function getDefaultMenu(): Promise<MenuOpenData> {
  let openKeys: string[] = [],
    selectKey: string[] = [],
    openedMenu: MenuItem[] = [];
  const menuList = await getMenus();
  menuList.some((list) => {
    const child = list[MENU_CHILDREN]
    if (child && child.length) {
      openKeys = [(list[MENU_KEY] as string)];
      selectKey = [(child[0][MENU_KEY] as string)];
      openedMenu = [child[0]];
      return true;
    }
    return false;
  });

  return {
    openKeys,
    selectKey,
    openedMenu,
  };
}

function getSessionUser() {
  return getKey(false, USER_INFO);
}

function saveUser(info: UserInfo) {
  setKey(true, USER_INFO, info);
  setKey(false, USER_INFO, info);
}

function sleep(seconed: number) {
  return new Promise((res, rej) => {
    setTimeout(res, seconed);
  });
}

function getLocalUser() {
  return getKey(true, USER_INFO);
}


function getMenuParentKey(list: MenuList, key: string | number): (string | number)[] {
  const keys: (string | number)[] = [];
  const info = list.find((item) => item[MENU_KEY] === key);
  let parentKey = info?.[MENU_PARENTKEY];
  if (parentKey) {
    const data = getMenuParentKey(list, parentKey)
    keys.push(...data);
    keys.push(String(parentKey));
  }
  return keys;
}

export function formatMenu(list: MenuList) {
  const newList = list.map(item => ({ ...item }))
  const menuMap: MenuMap = {};
  const parentMenu: MenuList = [];
  newList.forEach((item) => {
    // 当前 菜单的key
    const currentKey = item[MENU_KEY];
    // 当前 菜单的父菜单key
    const currentParentKey = item[MENU_PARENTKEY];
    // 如果 映射表还没有值 就把当前项 赋值进去
    if (!menuMap[currentKey]) {
      menuMap[currentKey] = item;
    } else {
      // 有值 说明 有子项 保留子项 把当前值 赋值进去
      item[MENU_CHILDREN] = menuMap[currentKey][MENU_CHILDREN];
      menuMap[currentKey] = item;
    }
    // 如果当前项 有父级
    if (currentParentKey) {
      // 父级还没有在映射表上
      if (!menuMap[currentParentKey]) {
        // 那就把映射上去 只有子集属性<Array>类型
        menuMap[currentParentKey] = {
          [MENU_CHILDREN]: [item],
        };
      } else if (
        menuMap[currentParentKey] &&
        !menuMap[currentParentKey][MENU_CHILDREN]
      ) {
        // 父级在映射表上 不过 没子集
        menuMap[currentParentKey][MENU_CHILDREN] = [item];
      } else {
        // 父级有 子集合也有
        menuMap[currentParentKey][MENU_CHILDREN]?.push(item);
      }
    } else {
      // 当前项是没有父级 那当前项就是父级项
      parentMenu.push(item);
    }
  });
  return parentMenu;
}


function reduceMenuList(list: MenuList, path: string = ''): MenuList {
  const data: MenuList = [];
  list.forEach((i) => {
    const { [MENU_CHILDREN]: children, ...item } = i;
    item[MENU_PARENTPATH] = path;
    if (children) {
      const childList = reduceMenuList(children, path + i[MENU_PATH]);
      data.push(...childList);
    }
    data.push(item);
  });
  return data;
}

function getLocalMenu(): MenuResponse | null {
  return getKey(false, MENU);
}

function saveLocalMenu(list: MenuResponse) {
  setKey(false, MENU, list);
}

function saveToken(token: Token) {
  setKey(true, TOKEN, token)
}

function getToken(): Token {
  return getKey(true, TOKEN)
}

function getKey(isLocal: boolean, key: string) {
  return JSON.parse(getStorage(isLocal).getItem(key) || "null");
}
function getStorage(isLocal: boolean) {
  return isLocal ? window.localStorage : window.sessionStorage;
}
function setKey(isLocal: boolean, key: string, data: any) {
  getStorage(isLocal).setItem(key, JSON.stringify(data || null));
}

function rmKey(isLocal: boolean, key: string) {
  getStorage(isLocal).removeItem(key);
}

function stopPropagation(e: MouseEvent) {
  e.stopPropagation();
}

function getLayoutMode(): LayoutMode[] | null {
  return getKey(true, LAYOUT_MODE);
}
function setLayoutMode(data: LayoutMode[]) {
  setKey(true, LAYOUT_MODE, data);
}
function clearLocalDatas(keys: string[]) {
  keys.forEach((key) => {
    rmKey(true, key);
    rmKey(false, key);
  });
}
function getCompVisible(): State["componentsVisible"] | null {
  return getKey(true, VISIBLE);
}
function setCompVisible(val: State["componentsVisible"]) {
  return setKey(true, VISIBLE, val);
}

export {
  getDefaultMenu,
  getSessionUser,
  saveUser,
  sleep,
  getLocalUser,
  getMenuParentKey,
  reduceMenuList,
  getLocalMenu,
  saveLocalMenu,
  saveToken,
  getToken,
  getKey,
  setKey,
  rmKey,
  stopPropagation,
  getLayoutMode,
  setLayoutMode,
  clearLocalDatas,
  getCompVisible,
  setCompVisible,
};
