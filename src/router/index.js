import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CacheRoute, CacheSwitch } from "react-router-cache-route";
import routerList from "@/components/route";

const router = () => {
  return (
    <Router>
      <CacheSwitch>
        {routerList.map((item) => {
          if (item.keepAlive === true) {
            return (
              <CacheRoute
                key={item.key}
                exact={true}
                path={item.path}
                children={item.components}
              />
            );
          }
          return (
            <Route
              exact={true}
              key={item.key}
              path={item.path}
              children={item.components}
            />
          );
        })}
      </CacheSwitch>
    </Router>
  );
};

export default router;
