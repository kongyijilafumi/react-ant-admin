import * as actionTypes from "./actionTypes";

const initGlobalState = {
  num: 0,
};

export default function reducer(state = initGlobalState, action) {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return { ...state, num: state.num - 1 };
    case actionTypes.DECREMENT:
      return { ...state, num: state.num - 1 };
    default:
      return state;
  }
}
