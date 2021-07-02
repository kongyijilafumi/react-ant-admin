import * as ActionTypes from "./actionTypes";

export const changeLayoutMode = (mode) => ({
  type: ActionTypes.SINGLE_COLUMN,
  mode,
});
