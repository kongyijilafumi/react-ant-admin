import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import AppRouter from "./router/appRouter";
var SetTheme;
if (process.env.showColorSet) {
  SetTheme = import("./components/theme");
}

class Theme extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { com: null };
  }
  componentDidMount() {
    if (SetTheme) {
      SetTheme.then(({ default: Com }) => {
        this.setState({ com: <Com /> });
      });
    }
  }
  render() {
    const { com } = this.state;
    return com ? com : null;
  }
}

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      {process.env.showColorSet && <Theme />}
    </Provider>
  );
}
export default App;
