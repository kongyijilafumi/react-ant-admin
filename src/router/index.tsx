import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import routerList, { RouterInfo } from "./list";
import Intercept from "./intercept";
import { getMenus } from "@/common";
import { formatMenu, reduceMenuList } from "@/utils";
import { MenuList } from "@/types"
import { useDispatchMenu } from "@/store/hooks";


const Router = () => {
  const { stateSetMenuList } = useDispatchMenu()
  const [mergeRouterList, setMergeList] = useState<RouterInfo[]>([]);// 本地 和 接口返回的路由列表 合并的结果
  const [ajaxUserMenuList, setAjaxUserMenuList] = useState<MenuList>([]); // 网络请求回来的 路由列表

  useEffect(() => {
    if (stateSetMenuList && typeof stateSetMenuList === "function") {
      getMenus().then((list) => {
        const formatList = formatMenu(list)
        const userMenus = reduceMenuList(formatList);
        // 把请求的数据 和 本地pages页面暴露出的路由列表合并
        let routers = routerList.map((router) => {
          let find = userMenus.find((i) => (i[MENU_PARENTPATH] || "") + i[MENU_PATH] === router[MENU_PATH]);
          if (find) {
            router = { ...find, ...router }; // 本地 优先 接口结果
          } else {
            router[MENU_KEY] = router[MENU_PATH];
          }
          return router;
        });
        if (list && list.length) {
          stateSetMenuList(formatList);
          setAjaxUserMenuList(userMenus);
          setMergeList(routers);
        }
      });
    }
  }, [stateSetMenuList]);


  const routerBody = useMemo(() => {
    // 监听 本地路由列表   同时存在长度大于1时 渲染路由组件
    if (mergeRouterList.length) {
      return mergeRouterList.map((item) => {
        let { [MENU_KEY]: key, [MENU_PATH]: path } = item;
        return (
          <Route
            key={key}
            path={path}
            element={<Intercept
              {...item}
              menuList={ajaxUserMenuList}
              pageKey={key}
            />}
          />
        );
      });
    }
  }, [ajaxUserMenuList, mergeRouterList])

  return <Routes>{routerBody}</Routes>;
};

export default Router;
