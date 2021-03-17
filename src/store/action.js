import * as ActionTypes from "./actionTypes";

export const increment = (num) => ({
  type: ActionTypes.INCREMENT,
  num,
});
export const decrement = (num) => ({
  type: ActionTypes.DECREMENT,
  num,
});
