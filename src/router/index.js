import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { CacheRoute, CacheSwitch } from "react-router-cache-route";
import { connect } from "react-redux";
import { setUserMenu } from "@/store/action";
import routerList from "./list";
import Intercept from "./intercept.js";
import { getMenus } from "@/common";
import { reduceMenuList } from "@/utils";

/**
 *
 * @param {Array} menuList 用户全局用户路由列表
 * @param {Function} setMenuList 设置全局用户路由列表
 * @returns {Array} 返回渲染的路由列表组件
 */
function useRouter(setMenuList) {
  const [localRouteList, setLocalRouteList] = useState([]); // 本地 pages 路由 生成的路由列表
  const [routerBody, setRoute] = useState(null);
  const [mergeRouterList, setMergeList] = useState([]);
  useEffect(() => {
    if (setMenuList && typeof setMenuList === "function") {
      getMenus().then((res) => {
        const userMenus = res.data;
        let list = reduceMenuList(userMenus); // 把 children 数组 提出来 拉平

        // 把请求的数据 和 本地pages页面暴露出的路由列表合并
        let routers = routerList.map((router) => {
          let find = list.find(
            (i) => (i.parentPath || "") + i.path === router.path
          );
          if (find) {
            router = { ...find, ...router };
          } else {
            router.key = router.path;
          }
          return router;
        });
        if (list && list.length) {
          setMenuList(userMenus);
          setLocalRouteList(list);
          setMergeList(routers);
        }
      });
    }
  }, [setMenuList]);
  // 监听 本地路由列表 和 合并后的用户菜单列表 同时存在长度大于1时 渲染路由组件
  useEffect(() => {
    if (localRouteList.length && mergeRouterList.length) {
      const dom = mergeRouterList.map((item) => {
        let { key, path } = item;
        const RenderRoute = item.keepAlive === "true" ? CacheRoute : Route;
        return (
          <RenderRoute
            key={key}
            exact={true}
            path={path}
            render={(allProps) => (
              <Intercept
                {...allProps}
                {...item}
                menuList={localRouteList}
                pageKey={key}
              />
            )}
          />
        );
      });
      setRoute(dom);
    }
  }, [localRouteList, mergeRouterList]);

  return { routerBody };
}

const Router = ({ setMenuList }) => {
  const { routerBody } = useRouter(setMenuList);
  return <CacheSwitch>{routerBody}</CacheSwitch>;
};

const mapDispatchToProps = (dispatch) => ({
  setMenuList: (list) => dispatch(setUserMenu(list)),
});
export default connect(null, mapDispatchToProps)(Router);
