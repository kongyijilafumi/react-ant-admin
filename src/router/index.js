import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { CacheRoute, CacheSwitch } from "react-router-cache-route";
import routerList from "./list";
import Intercept from "./intercept.js";
import { getMenus } from "@/common";
import { reduceMenuList } from "@/utils";

function useRouter() {
  const [list, setList] = useState([]);
  const [routerBody, setRoute] = useState(null);

  useEffect(() => {
    getMenus().then((res) => {
      let list = reduceMenuList(res.data);
      let routers = routerList.map((router) => {
        let find = list.find(
          (i) => (i.parentPath || "") + i.path === router.path
        );
        if (find) {
          router = { ...find, ...router };
        }
        return router;
      });
      if (list && list.length) {
        setList(routers);
      }
    });
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      const dom = list.map((item) => {
        let { key, path } = item;
        const RenderRoute = item.keepAlive === "true" ? CacheRoute : Route;
        return (
          <RenderRoute
            key={key}
            exact={true}
            path={path}
            render={(allProps) => (
              <Intercept {...allProps} {...item} pageKey={key} />
            )}
          />
        );
      });
      setRoute(dom);
    }
  }, [list]);

  return { routerBody };
}

const Router = () => {
  const { routerBody } = useRouter();
  return <CacheSwitch>{routerBody}</CacheSwitch>;
};

export default Router;
