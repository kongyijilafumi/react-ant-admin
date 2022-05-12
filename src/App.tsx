import { Provider } from "react-redux";
import store from "./store";
import LayoutSet from "./components/layout-set";
import AppRouter from "./router/appRouter";
function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <LayoutSet />
    </Provider >
  );
}
export default App;
