import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLayoutMode } from "../action";
import { getLayoutMode } from "../getters";

export const useStateLayout = () => useSelector(getLayoutMode)

export function useDispatchLayout() {
  const dispatch = useDispatch()
  const stateChangeLayout = useCallback((type, mode) => dispatch(changeLayoutMode(type, mode)), [dispatch])
  return {
    stateChangeLayout
  }
}