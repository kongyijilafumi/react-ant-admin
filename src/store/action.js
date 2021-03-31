import * as ActionTypes from "./actionTypes";

export const increment = (num) => ({
  type: ActionTypes.INCREMENT,
  num,
});
export const decrement = (num) => ({
  type: ActionTypes.DECREMENT,
  num,
});

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

export const setOpenMenu = (openKey) => ({
  type: ActionTypes.SET_OPENMENU,
  openKey,
});
