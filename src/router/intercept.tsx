import { useCallback, useEffect, useState } from "react";
import { addOpenedMenu, setOpenKey, setSelectKey, setCurrentPath } from "@/store/menu/action";
import { useDispatch, useSelector } from "react-redux";
import { getMenuParentKey } from "@/utils";
import Error from "@/pages/err";
import { useLocation } from "react-router-dom";
import { MenuItem, OpenedMenu } from "@/types";
import { getStateOpenMenu } from "@/store/getter";


interface Props {
  [MENU_PATH]?: string
  [MENU_TITLE]?: string
  pageKey: string
  menuList: Array<MenuItem>
  [key: string]: any
}

function Intercept({ menuList, components, [MENU_TITLE]: title, [MENU_PATH]: pagePath, pageKey }: Props) {
  const [pageInit, setPageInit] = useState(false)
  const location = useLocation()
  const openMenu = useSelector(getStateOpenMenu)
  const dispatch = useDispatch()
  const setPath = useCallback((path: string) => dispatch(setCurrentPath(path)), [dispatch])
  const setOpenKeys = useCallback((val: string[]) => dispatch(setOpenKey(val)), [dispatch])
  const setSelectedKeys = useCallback((val: string[]) => dispatch(setSelectKey(val)), [dispatch])
  const addOpenedMenuFn = useCallback((val: OpenedMenu) => dispatch(addOpenedMenu(val)), [dispatch])

  const pushMenu = useCallback((info: any, key: any, path: any, title: any) => {
    if (!info) {
      addOpenedMenuFn({ key, path, title })
    }
  }, [addOpenedMenuFn])

  const scrollPage = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [])

  const setInfo = useCallback(() => {
    if (!title) {
      return;
    }
    const { pathname, hash, search } = location
    document.title = title;
    const pagePath = pathname + (hash || search);
    const findInfo = openMenu.find((i) => i.path === pagePath);
    setPath(pagePath)
    setSelectedKeys([String(pageKey)]);
    let openkey = getMenuParentKey(menuList, pageKey);
    setOpenKeys(openkey);
    pushMenu(findInfo, pageKey, pagePath, title);
  }, [location, openMenu, menuList, title, pageKey, setOpenKeys, setPath, setSelectedKeys, pushMenu])

  const init = useCallback(() => {
    setInfo()
    scrollPage()
  }, [setInfo, scrollPage])

  useEffect(() => {
    if (init && !pageInit) {
      init()
      setPageInit(true)
    }
  }, [init, pageInit])


  const hasPath = !menuList.find(
    (m) => (m[MENU_PARENTPATH] || "") + m[MENU_PATH] === pagePath
  );

  if (hasPath && pagePath !== "/" && pagePath !== "*") {
    return (
      <Error
        status="403"
        errTitle="权限不够"
        subTitle="Sorry, you are not authorized to access this page."
      />
    );
  }

  return (components);
}
export default Intercept
