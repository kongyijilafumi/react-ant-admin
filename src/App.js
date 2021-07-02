import { Provider } from "react-redux";
import store from "./store";
import loadable from "@loadable/component";
import Theme from "./components/theme";
import LayoutSet from "./components/layout-set";
const AppRouter = loadable(() => import("./router/appRouter"));
function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      {process.env.showColorSet && <Theme />}
      <LayoutSet />
    </Provider>
  );
}
export default App;
