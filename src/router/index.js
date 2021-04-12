import React from "react";
import { Route } from "react-router-dom";
import { CacheRoute, CacheSwitch } from "react-router-cache-route";
import routerList from "./route";
import Intercept from "./intercept";

const router = () => {
  return (
    <CacheSwitch>
      {routerList.map((item) => {
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

export default router;
