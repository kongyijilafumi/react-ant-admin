import menuList from "@/common/menu";


/**
 * 根据当前页面路由选中菜单
 * @returns {Object} openKeys selectKey openedMenu
 */
function currentMenu() {
  let openKeys = [];
  let selectKey = [];
  let openedMenu = [];
  const path = window.location.pathname;
  menuList.some((list) => {
    const firstKey = list.key;
    if (list.path === path) {
      openKeys.push(firstKey);
      selectKey.push(firstKey);
      openedMenu.push(list);
      return true;
    }
    if (list.children) {
      return list.children.some((item) => {
        const childKey = item.key;
        if (item.path === path) {
          openKeys.push(firstKey);
          selectKey.push(childKey);
          openedMenu.push(item);
          return true;
        }
        return false;
      });
    }
    return false;
  });
  return {
    openKeys,
    selectKey,
    openedMenu,
  };
}

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


export {
  currentMenu,
  getDefaultMenu,
  getSeesionUser,
  clearSessionUser,
  saveUser,
  sleep,
  getLocalUser,
};
