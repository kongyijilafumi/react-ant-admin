import { useCallback, useEffect, useMemo, useState } from "react";
import { addOpenedMenu, setOpenKey, setSelectKey, setCurrentPath } from "@/store/menu/action";
import { useDispatch } from "react-redux";
import { getMenuParentKey } from "@/utils";
import Error from "@/pages/err";
import { useLocation } from "react-router-dom";
import { MenuItem, OpenedMenu } from "@/types";

const scrollPage = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

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
  const dispatch = useDispatch()
  const setPath = useCallback((path: string) => dispatch(setCurrentPath(path)), [dispatch])
  const setOpenKeys = useCallback((val: string[]) => dispatch(setOpenKey(val)), [dispatch])
  const setSelectedKeys = useCallback((val: string[]) => dispatch(setSelectKey(val)), [dispatch])
  const addOpenedMenuFn = useCallback((val: OpenedMenu) => dispatch(addOpenedMenu(val)), [dispatch])

  const currentPath = useMemo(() => {
    const { pathname, search } = location
    return pathname + search
  }, [location])

  // 监听 location 改变
  const onPathChange = useCallback(() => {
    setPath(currentPath)
    addOpenedMenuFn({ key: pageKey, path: currentPath, title: title || "未设置标题信息" });
  }, [currentPath, pageKey, title, setPath, addOpenedMenuFn])

  const setCurrentPageInfo = useCallback(() => {
    if (!title) {
      return;
    }
    document.title = title;
    setSelectedKeys([String(pageKey)]);
    let openkey = getMenuParentKey(menuList, pageKey);
    setOpenKeys(openkey);
    addOpenedMenuFn({ key: pageKey, path: currentPath, title });
  }, [currentPath, menuList, title, pageKey, setOpenKeys, setSelectedKeys, addOpenedMenuFn])

  const init = useCallback(() => {
    setCurrentPageInfo()
    scrollPage()
  }, [setCurrentPageInfo])

  useEffect(() => {
    if (init && !pageInit) {
      init()
      setPageInit(true)
    }
  }, [init, pageInit])

  useEffect(() => {
    if (pageInit) {
      onPathChange()
    }
  }, [onPathChange, pageInit])


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
