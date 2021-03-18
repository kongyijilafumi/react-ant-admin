import menuList from "@/common/menu";

/**
 * 保存菜单状态本地
 * @param {Array} openKeys 打开的菜单
 * @param {Array} selectKeys 选中的菜单
 */
function saveLocalMenu(openKeys, selectKeys) {
  localStorage.setItem("openkey", JSON.stringify(openKeys || []));
  localStorage.setItem("selectKey", JSON.stringify(selectKeys || []));
}

/**
 * 获取本地菜单状态
 * @returns {Object}  openKeys，selectKey
 */
function getLocalMenu() {
  let openKeys = localStorage.getItem("openKey") || "[]";
  let selectKey = localStorage.getItem("selectKey") || "[]";
  return {
    openKeys,
    selectKey,
  };
}

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
      list.children.some((item) => {
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

export { saveLocalMenu, getLocalMenu, currentMenu };
