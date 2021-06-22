import * as ActionTypes from "./actionTypes";

export const setUserInfoAction = (info) => ({
  type: ActionTypes.SET_USERINFO,
  info,
});
export const clearUser = () => ({
  type: ActionTypes.CLEAR_USERINFO,
});
