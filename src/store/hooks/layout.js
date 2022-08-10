import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLayoutMode } from "../action";
import { getLayoutMode } from "../getters";

export const useStateLayout = () => useSelector(getLayoutMode)

export function useDispatchLayout() {
  const dispatch = useDispatch()
  const stateChangeLayout = useCallback((mode) => dispatch(changeLayoutMode(mode)), [dispatch])
  return {
    stateChangeLayout
  }
}