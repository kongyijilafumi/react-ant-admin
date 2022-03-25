import * as ActionTypes from "./actionTypes";

export const addOpenedMenu = (menuItem) => ({
  type: ActionTypes.ADDOPENTMENU,
  menuItem,
});

export const setOpenKey = (keys) => ({
  type: ActionTypes.SET_OPENKEY,
  keys,
});

export const setSelectKey = (keys) => ({
  type: ActionTypes.SET_SELECTKEY,
  keys,
});

export const filterOpenKey = (key) => ({
  type: ActionTypes.FILTER_OPENKEY,
  key,
});
export const setUserMenu = (list) => ({
  type: ActionTypes.SET_USERMENU,
  list,
});

export const setCurrentPath = (path) => ({
  type: ActionTypes.SETCURRENTPATH,
  path
})