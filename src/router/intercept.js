import React, { useCallback, useEffect, useMemo, useState } from "react";
import { addOpenedMenu, setOpenKey, setSelectKey, setCurrentPath } from "@/store/menu/action";
import { useDispatch } from "react-redux";
import { getMenuParentKey } from "@/utils";
import { useDidRecover } from "react-router-cache-route"
import Error from "@pages/err";
import { Spin } from "antd";
import { useLocation } from "react-router-dom";

const scrollPage = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

const fallback = <Spin style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 500,
  fontSize: 24,
}} tip="页面加载中...." />

function Intercept({ menuList, components: Components, [MENU_TITLE]: title, [MENU_PATH]: pagePath, pageKey, ...itemProps }) {
  const location = useLocation()
  const dispatch = useDispatch()
  const setPath = useCallback((path) => dispatch(setCurrentPath(path)), [dispatch])
  const setOpenKeys = useCallback((val) => dispatch(setOpenKey(val)), [dispatch])
  const setSelectedKeys = useCallback((val) => dispatch(setSelectKey(val)), [dispatch])
  const addOpenedMenuFn = useCallback((val) => dispatch(addOpenedMenu(val)), [dispatch])
  const [pageInit, setPageInit] = useState(false)

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
    if (!pageInit) {
      init()
      setPageInit(true)
    }
  }, [init, pageInit])

  useEffect(() => {
    if (pageInit) {
      onPathChange()
    }
  }, [onPathChange, pageInit])

  useDidRecover(init, [init])

  const hasPath = !menuList.find(
    (m) => (m[MENU_PARENTPATH] || "") + m[MENU_PATH] === pagePath
  );

  if (hasPath && pagePath !== "/" && pagePath !== "*") {
    return (
      <Error
        {...itemProps}
        status="403"
        errTitle="权限不够"
        subTitle="Sorry, you are not authorized to access this page."
      />
    );
  }

  return (
    <Components
      {...itemProps}
      fallback={fallback}
    />
  );
}
export default Intercept
