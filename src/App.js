import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router";
import LayoutBody from "@/layout";
import Header from "@/layout/header";
import Menu from "@/layout/siderMenu";
import TopMenu from "@/layout/topMenu";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <LayoutBody
          header={<Header />}
          menu={<Menu />}
          content={<Routes />}
          topMenu={<TopMenu />}
        />
      </Router>
      {/* <Router /> */}
    </Provider>
  );
}
export default App;
