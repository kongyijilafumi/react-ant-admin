import { getSessionUser } from "@/utils";
import { UserInfo, UserAction } from "@/types"
import * as actionTypes from "./actionTypes";
const initState: UserInfo = getSessionUser()

export default function reducer(state = initState, action: UserAction) {
  const { type, info } = action
  switch (type) {
    case actionTypes.SET_USERINFO:
      return info
    case actionTypes.CLEAR_USERINFO: {
      return null
    }
    default:
      return state
  }
}