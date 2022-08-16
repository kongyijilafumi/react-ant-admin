import { Provider } from "react-redux";
import store from "./store";
import LayoutSet from "./components/layout-set";
import AppRouter from "./router/appRouter";
import loadable from "@loadable/component";


function Theme() {
  if (__IS_THEME__) {
    const Com = loadable(() => import("@/components/theme"))
    return <Com />
  }
  return null
}

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <Theme />
      <LayoutSet />
    </Provider >
  );
}
export default App;
