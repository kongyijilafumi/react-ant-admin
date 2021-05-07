import { createStore, combineReducers } from "redux";
import appReducer from "./reducer";

const reducer = combineReducers({
  global: appReducer,
});

const store = createStore(
  reducer,
  process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
