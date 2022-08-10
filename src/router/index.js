import React, { useEffect, useState, useMemo } from "react";
import { Route } from "react-router-dom";
import { CacheRoute, CacheSwitch } from "react-router-cache-route";
import routerList from "./list";
import Intercept from "./intercept.js";
import { getMenus } from "@/common";
import { formatMenu, reduceMenuList } from "@/utils";
import { useDispatchMenu } from "@/store/hooks";

/**
 *
 * @param {Array} menuList 用户全局用户路由列表
 * @param {Function} stateSetMenuList 设置全局用户路由列表
 * @returns {Array} 返回渲染的路由列表组件
 */
function useRouter() {
  const { stateSetMenuList } = useDispatchMenu()
  const [ajaxUserMenuList, setAjaxUserMenuList] = useState([]); // 网络请求回来的 路由列表
  const [mergeRouterList, setMergeLRouterList] = useState([]);// 本地 和 接口返回的路由列表 合并的结果
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
          setMergeLRouterList(routers);
        }
      });
    }
  }, [stateSetMenuList]);

  const routerBody = useMemo(() => {
    // 监听 本地路由列表   同时存在长度大于1时 渲染路由组件
    if (mergeRouterList.length) {
      return mergeRouterList.map((item) => {
        let { [MENU_KEY]: key, [MENU_PATH]: path } = item;
        const RenderRoute = item[MENU_KEEPALIVE] === "true" ? CacheRoute : Route;
        return (
          <RenderRoute
            key={key}
            exact={true}
            path={path}
            render={(allProps) => (
              <Intercept
                {...allProps}
                {...item}
                menuList={ajaxUserMenuList}
                pageKey={key}
              />
            )}
          />
        );
      });
    }
    return null
  }, [ajaxUserMenuList, mergeRouterList])
  return { routerBody };
}

const Router = () => {
  const { routerBody } = useRouter();
  return <CacheSwitch>{routerBody}</CacheSwitch>;
};

export default Router;
