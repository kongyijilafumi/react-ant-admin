import { Provider } from "react-redux";
import store from "./store";
import loadable from "@loadable/component";
import Theme from "./components/theme";

const AppRouter = loadable(() => import("./router/appRouter"));
function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      {process.env.showColorSet && <Theme />}
    </Provider>
  );
}
export default App;
