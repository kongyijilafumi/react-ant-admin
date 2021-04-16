import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { CacheRoute, CacheSwitch } from "react-router-cache-route";
import routerList from "./route";
import Intercept from "./intercept";
import { getMenus } from "@/common";
import { reduceMenuList } from "@/utils";

const Router = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getMenus().then((res) => {
      let list = reduceMenuList(res);
      let routers = routerList.map((router) => {
        let find = list.find((i) => i.path === router.path);
        if (find) {
          router.type = find.type;
        }
        return router;
      });
      setList(routers);
    });
  }, []);
  return (
    <CacheSwitch>
      {list.map((item) => {
        let { key, path } = item;
        if (item.keepAlive === true) {
          return (
            <CacheRoute
              key={key}
              exact={true}
              path={path}
              render={(allProps) => (
                <Intercept {...allProps} {...item} pageKey={key} />
              )}
            />
          );
        }
        return (
          <Route
            exact={true}
            key={key}
            path={path}
            render={(allProps) => (
              <Intercept {...allProps} {...item} pageKey={key} />
            )}
          />
        );
      })}
    </CacheSwitch>
  );
};

export default Router;
