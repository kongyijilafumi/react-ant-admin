import * as actionTypes from "./actionTypes";
import { currentMenu } from "@/utils";

const currentMenuDetails = currentMenu();

const initGlobalState = {
  num: 0,
  openedMenu: currentMenuDetails.openedMenu, // 保存已经打开的菜单栏
  openMenuKey: currentMenuDetails.openKeys, // 打开的菜单栏的key
  selectMenuKey: currentMenuDetails.selectKey, // 选中菜单栏的key
};

export default function reducer(state = initGlobalState, action) {
  const { openKey, type } = action;
  switch (type) {
    case actionTypes.INCREMENT:
      return { ...state, num: state.num - 1 };
    case actionTypes.DECREMENT:
      return { ...state, num: state.num - 1 };
    case actionTypes.ADDOPENTMENU:
      if (!state.openedMenu.find((i) => i.key === openKey.key)) {
        const openedMenu = [...state.openedMenu];
        delete openKey.children;
        openedMenu.push(openKey);
        return { ...state, openedMenu };
      }
      return state;
    case actionTypes.SET_OPENKEY:
      return { ...state, openMenuKey: openKey };
    case actionTypes.SET_SELECTKEY:
      if (state.selectMenuKey[0] === openKey[0]) {
        return state;
      }
      return { ...state, selectMenuKey: openKey };
    case actionTypes.FILTER_OPENKEY:
      debugger
      const openedMenu = state.openedMenu.filter((i) => i.key !== openKey);
      return { ...state, openedMenu };
    default:
      return state;
  }
}
