import menuList from "@/common/menu";
import { RouterBasename } from "@/common";

function getDefaultMenu() {
  let openKeys = [],
    selectKey = [],
    openedMenu = [];
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
  const userInfo = window.sessionStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : undefined;
}

function saveUser(info) {
  window.sessionStorage.setItem("userInfo", JSON.stringify(info));
  window.localStorage.setItem("userInfo", JSON.stringify(info));
}

function sleep(seconed) {
  return new Promise((res, rej) => {
    setTimeout(res, seconed);
  });
}

function clearSessionUser() {
  window.sessionStorage.removeItem("userInfo");
}

function getLocalUser() {
  const userInfo = window.localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : undefined;
}

function getCurrentUrl() {
  let path = window.location.pathname;
  path = path.replace(RouterBasename, "");
  return path;
}

function getMenuParentKey(key) {
  let parentKey;
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

export {
  getDefaultMenu,
  getSeesionUser,
  clearSessionUser,
  saveUser,
  sleep,
  getLocalUser,
  getCurrentUrl,
  getMenuParentKey,
};
