import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVisible } from "../action";
import { getComponentsVisible } from "../getters";

export const useStateVisibel = () => useSelector(getComponentsVisible)

export function useDispatchVisibel() {
  const dispatch = useDispatch()
  const stateSetVisible = useCallback((key, val) => dispatch(setVisible(key, val)), [dispatch])
  return {
    stateSetVisible
  }
}