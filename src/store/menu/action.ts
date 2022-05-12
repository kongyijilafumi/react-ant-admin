import * as ActionTypes from "./actionTypes";
import { OpenedMenu, MenuItem } from "@/types"
export const addOpenedMenu = (menuItem: OpenedMenu) => ({
  type: ActionTypes.ADDOPENTMENU,
  menuItem,
});

export const setOpenKey = (keys: string[]) => ({
  type: ActionTypes.SET_OPENKEY,
  keys,
});

export const setSelectKey = (keys: string[]) => ({
  type: ActionTypes.SET_SELECTKEY,
  keys,
});

export const filterOpenKey = (keys: string[]) => ({
  type: ActionTypes.FILTER_OPENKEY,
  keys,
});

export const setUserMenu = (list: MenuItem[]) => ({
  type: ActionTypes.SET_USERMENU,
  list,
});


export const setCurrentPath = (path: string) => ({
  type: ActionTypes.SETCURRENTPATH,
  path
})