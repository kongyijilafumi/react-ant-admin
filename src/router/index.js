import React from "react";
import { Route } from "react-router-dom";
import { CacheRoute, CacheSwitch } from "react-router-cache-route";
import routerList from "./route";

const router = () => {
  return (
    <CacheSwitch>
      {routerList.map((item) => {
        let { components, key, ...itemProps } = item;
        if (item.keepAlive === true) {
          return (
            <CacheRoute
              key={key}
              exact={true}
              path={item.path}
              render={(allProps) => {
                document.title = itemProps.title;
                return React.createElement(components, {
                  ...allProps,
                  ...itemProps,
                  pageKey: key,
                });
              }}
            />
          );
        }
        return (
          <Route
            exact={true}
            key={key}
            path={item.path}
            render={(allProps) => {
              document.title = itemProps.title;
              return React.createElement(components, {
                ...allProps,
                ...itemProps,
                pageKey: key,
              });
            }}
          />
        );
      })}
    </CacheSwitch>
  );
};

export default router;
