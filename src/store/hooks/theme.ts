import { StateTheme } from "@/types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStateThemeToken } from "../getter";
import { setThemeToken } from "../theme/action";

export const useStateThemeToken = () => useSelector(getStateThemeToken)

export const useDispatchThemeToken = () => {
  const dispatch = useDispatch()
  const stateSetThemeToken = useCallback((token: StateTheme['token']) => dispatch(setThemeToken(token)), [dispatch])
  return { stateSetThemeToken }
}