import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Router from "./router";
import LayoutBody from "@/layout";
import Header from "@/layout/header";
import Menu from "@/layout/siderMenu";
function App() {
  return (
    <Provider store={store}>
      {/* <Router /> */}
      <LayoutBody header={<Header />} menu={<Menu />} />
    </Provider>
  );
}
export default App;
