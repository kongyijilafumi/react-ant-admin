import * as actionTypes from "./actionTypes";
import { currentMenu } from "@/utils";

const currentMenuDetails = currentMenu();
const initGlobalState = {
  num: 0,
  openedMenu: currentMenuDetails.openedMenu,
  openMenuKey: currentMenuDetails.openKeys,
  selectMenuKey: currentMenuDetails.selectKey,
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
      return { ...state, selectMenuKey: openKey };
    default:
      return state;
  }
}
