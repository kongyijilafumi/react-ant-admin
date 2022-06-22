import { State } from "@/types";

export const getStateOpenMenu = (state: State) => state.menu.openedMenu
export const getStateCurrentPath = (state: State) => state.menu.currentPath
export const getStateMenuList = (state: State) => state.menu.menuList
export const getStateSelectMenuKey = (state: State) => state.menu.selectMenuKey
export const getstateOpenMenuKey = (state: State) => state.menu.openMenuKey