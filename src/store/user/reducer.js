import * as actionTypes from "./actionTypes";
import { getSessionUser } from "@/utils";

const UserState = getSessionUser() || null;

export default function reducer(state = UserState, action) {
  const { type, info } = action;
  switch (type) {
    case actionTypes.SET_USERINFO: {
      return info;
    }
    case actionTypes.CLEAR_USERINFO: {
      return null;
    }
    default: {
      return state;
    }
  }
}
