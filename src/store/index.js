import { createStore, combineReducers } from "redux";
import appReducer from "./reducer";

const initState = {
  
};

const reducer = combineReducers({
  "global": appReducer,
});

const store = createStore(reducer, initState);

export default store;
