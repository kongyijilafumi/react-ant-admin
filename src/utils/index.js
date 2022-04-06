import { getMenus, USER_INFO, MENU, LAYOUT_MODE, COMPONENTS_VISIBEL, TOKEN } from "@/common";

// 获取默认页面
async function getDefaultMenu() {
  let openKeys = [],
    selectKey = [],
    openedMenu = [];
  const res = await getMenus();
  res.data.some((list) => {
    const child = list[MENU_TITLE];
    if (child && child.length) {
      openKeys = [list[MENU_KEY]];
      selectKey = [child[0][MENU_KEY]];
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

function saveUser(info) {
  setKey(true, USER_INFO, info);
  setKey(false, USER_INFO, info);
}

function sleep(seconed) {
  return new Promise((res, rej) => {
    setTimeout(res, seconed);
  });
}

function getLocalUser() {
  return getKey(true, USER_INFO);
}

function getMenuParentKey(list, key) {
  const keys = [];
  const info = list.find((item) => item[MENU_KEY] === key);
  let parentKey = info ? info[MENU_PARENTKEY] : info;
  if (parentKey) {
    const data = getMenuParentKey(list, parentKey);
    keys.push(...data);
    keys.push(String(parentKey));
  }
  return keys;
}

function reduceMenuList(list, path = "") {
  const data = [];
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

function getLocalMenu() {
  return getKey(false, MENU);
}

function saveLocalMenu(menu) {
  setKey(false, MENU, menu);
}

function saveToken(token) {
  setKey(true, TOKEN, token);
}

function getToken() {
  return getKey(true, TOKEN);
}

function getKey(isLocal, key) {
  return JSON.parse(getStorage(isLocal).getItem(key) || "null");
}
function getStorage(isLocal) {
  return isLocal ? window.localStorage : window.sessionStorage;
}
function setKey(isLocal, key, data) {
  getStorage(isLocal).setItem(key, JSON.stringify(data || null));
}

function rmKey(isLocal, key) {
  getStorage(isLocal).removeItem(key);
}

function stopPropagation(e) {
  e.stopPropagation();
}

function getLayoutMode() {
  return getKey(true, LAYOUT_MODE);
}
function setLayoutMode(data) {
  setKey(true, LAYOUT_MODE, data);
}

/**
 * 删除的一组本地数据
 * @param {Array} keys 删除的一组本地数据的键值
 */
function clearLocalDatas(keys) {
  keys.forEach((key) => {
    rmKey(true, key);
    rmKey(false, key);
  });
}
function getCompVisibel() {
  return getKey(true, COMPONENTS_VISIBEL);
}
function setCompVisibel(val) {
  return setKey(true, COMPONENTS_VISIBEL, val);
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
  getCompVisibel,
  setCompVisibel,
};
