import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import AppRouter from "./router/appRouter";
import SetTheme from "./components/theme";
import "@/theme/index.less";
function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <SetTheme />
    </Provider>
  );
}
export default App;
