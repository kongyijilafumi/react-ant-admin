import * as actionTypes from "./actionTypes";
import { getSeesionUser } from "@/utils";

const initGlobalState = {
  openedMenu: [], // 保存已经打开的菜单栏 用于侧边栏
  openMenuKey: [], // 打开的菜单栏的key  用于顶部导航
  selectMenuKey: [], // 选中菜单栏的key  用户侧边栏
  userInfo: getSeesionUser(),
};

export default function reducer(state = initGlobalState, action) {
  const { openKey, type, info } = action;
  switch (type) {
    case actionTypes.ADDOPENTMENU: {
      if (!state.openedMenu.find((i) => i.key === openKey.key)) {
        const openedMenu = [...state.openedMenu];
        delete openKey.children;
        openedMenu.push(openKey);
        return { ...state, openedMenu };
      }
      return state;
    }
    case actionTypes.SET_OPENKEY: {
      return { ...state, openMenuKey: openKey };
    }
    case actionTypes.SET_SELECTKEY: {
      if (state.selectMenuKey[0] === openKey[0]) {
        return state;
      }
      return { ...state, selectMenuKey: openKey };
    }
    case actionTypes.FILTER_OPENKEY: {
      const openedMenu = state.openedMenu.filter((i) => i.path !== openKey);
      if (state.openMenuKey.length === openedMenu.length) {
        return state;
      }
      return { ...state, openedMenu };
    }
    case actionTypes.SET_OPENMENU: {
      return { ...state, openedMenu: openKey };
    }
    case actionTypes.SET_USERINFO: {
      return { ...state, userInfo: info };
    }
    case actionTypes.CLEAR_USERINFO: {
      return { ...initGlobalState, userInfo: null };
    }
    default: {
      return state;
    }
  }
}
