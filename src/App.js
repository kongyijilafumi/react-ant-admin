import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import AppRouter from "./router/appRouter";
function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}
export default App;
