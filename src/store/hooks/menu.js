import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenKey, setSelectKey, addOpenedMenu, filterOpenKey, setCurrentPath, setUserMenu } from "../action";
import { getCurrentPath, getMenuList, getOpenedMenu, getOpenMenuKey, getSelectMenuKey } from "../getters";

export const useStateSelectMenuKey = () => useSelector(getSelectMenuKey)
export const useStateOpenMenuKey = () => useSelector(getOpenMenuKey)
export const useStateOpenedMenu = () => useSelector(getOpenedMenu)
export const useStateCurrentPath = () => useSelector(getCurrentPath)
export const useStateMenuList = () => useSelector(getMenuList)

export function useDispatchMenu() {
  const dispatch = useDispatch()
  const stateSetOpenMenuKey = useCallback((keys) => dispatch(setOpenKey(keys)), [dispatch])
  const stateSetSelectMenuKey = useCallback((keys) => dispatch(setSelectKey(keys)), [dispatch])
  const stateFilterOpenMenuKey = useCallback((key) => dispatch(filterOpenKey(key)), [dispatch])
  const stateAddOpenedMenu = useCallback((menuItem) => dispatch(addOpenedMenu(menuItem)), [dispatch])
  const stateSetMenuList = useCallback((list) => dispatch(setUserMenu(list)), [dispatch])
  const stateSetCurrentPath = useCallback((path) => dispatch(setCurrentPath(path)), [dispatch])
  return {
    stateSetOpenMenuKey,
    stateSetSelectMenuKey,
    stateFilterOpenMenuKey,
    stateAddOpenedMenu,
    stateSetMenuList,
    stateSetCurrentPath,
  }
}