import { getMenus, RouterBasename } from "@/common";

// 获取默认页面
async function getDefaultMenu() {
  let openKeys = [],
    selectKey = [],
    openedMenu = [];
  const menuList = await getMenus();
  menuList.some((list) => {
    const child = list.children;
    if (child && child.length) {
      openKeys = [list.key];
      selectKey = [child[0]["key"]];
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

function getSeesionUser() {
  return getKey(false, "userInfo");
}

function saveUser(info) {
  setKey(true, "userInfo", info);
  setKey(false, "userInfo", info);
}

function sleep(seconed) {
  return new Promise((res, rej) => {
    setTimeout(res, seconed);
  });
}

function clearSessionUser() {
  rmKey(false, "userInfo");
}

function getLocalUser() {
  return getKey(true, "userInfo");
}

// 获取当前url
function getCurrentUrl() {
  let path = window.location.pathname;
  path = path.replace(RouterBasename, "");
  return path;
}

async function getMenuParentKey(key) {
  let parentKey;
  const menuList = await getMenus();
  menuList.some((menu) => {
    if (menu.key === key) {
      parentKey = key;
      return true;
    }
    if (Array.isArray(menu.children) && menu.children.length) {
      return menu.children.some((child) => {
        if (child.key === key) {
          parentKey = child.parentKey;
          return true;
        }
        return false;
      });
    }
    return false;
  });
  return parentKey;
}

function filterMenuList(list, type) {
  return list.filter((item) => {
    if (item.children && Array.isArray(item.children) && item.children.length) {
      item.children = filterMenuList(item.children, type);
    }
    if (item.type.includes(type)) {
      return true;
    }
    return false;
  });
}

function reduceMenuList(list) {
  return list.reduce((a, c) => {
    a.push(c);
    if (c.children) {
      a.push(...c.children);
    }
    return a;
  }, []);
}

function getLocalMenu() {
  return getKey(false, "menu");
}

function saveLocalMenu(list) {
  setKey(false, "menu", list);
}

function saveToken(token) {
  let str = token || "";
  localStorage.setItem("token", str);
}

function getToken() {
  return localStorage.getItem("token");
}

function getKey(isLocal, key) {
  let storeage = getStorage(isLocal);
  let data = storeage.getItem(key) || "null";
  return JSON.parse(data);
}
function getStorage(isLocal) {
  return isLocal ? window.localStorage : window.sessionStorage;
}
function setKey(isLocal, key, data) {
  let storeage = getStorage(isLocal);
  storeage.setItem(key, JSON.stringify(data || null));
}

function rmKey(isLocal, key) {
  let storeage = getStorage(isLocal);
  storeage.removeItem(key);
}

export {
  getDefaultMenu,
  getSeesionUser,
  clearSessionUser,
  saveUser,
  sleep,
  getLocalUser,
  getCurrentUrl,
  getMenuParentKey,
  filterMenuList,
  reduceMenuList,
  getLocalMenu,
  saveLocalMenu,
  saveToken,
  getToken,
  getKey,
  setKey,
};
