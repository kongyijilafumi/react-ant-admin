import { Provider } from "react-redux";
import store from "./store";
import LayoutSet from "./components/layout-set";
import AppRouter from "./router/appRouter";
import Theme from "@/components/theme"
function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      {import.meta.env.REACT_APP_COLOR === "1" && <Theme />}
      <LayoutSet />
    </Provider >
  );
}
export default App;
