import * as ActionTypes from "./actionTypes";


export const addOpenedMenu = (openKey) => ({
  type: ActionTypes.ADDOPENTMENU,
  openKey,
});

export const setOpenKey = (openKey) => ({
  type: ActionTypes.SET_OPENKEY,
  openKey,
});

export const setSelectKey = (openKey) => ({
  type: ActionTypes.SET_SELECTKEY,
  openKey,
});

export const filterOpenKey = (openKey) => ({
  type: ActionTypes.FILTER_OPENKEY,
  openKey,
});

export const setUserInfoAction = (info) => ({
  type: ActionTypes.SET_USERINFO,
  info,
});

export const clearUser = () => ({
  type: ActionTypes.CLEAR_USERINFO,
});
