import { Provider } from "react-redux";
import store from "./store";
import LayoutSet from "./components/layout-set";
import AppRouter from "./router/appRouter";
import loadable from "@loadable/component";
import { ConfigProvider } from 'antd';
import { useStateThemeToken } from "./store/hooks";
import { useMemo } from "react";
const LoadTheme = loadable(() => import("@/components/theme"))

function Theme() {
  if (__IS_THEME__) {
    return <LoadTheme />
  }
  return null
}

function App() {
  return (
    <Provider store={store}>
      <Cfg />
    </Provider >
  );
}

function Cfg() {
  const token = useStateThemeToken()
  const themm = useMemo(() => ({ token }), [token])
  return <ConfigProvider theme={themm}>
    <AppRouter />
    <LayoutSet />
    <Theme />
  </ConfigProvider >
}
export default App;
