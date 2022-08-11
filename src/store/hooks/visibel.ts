import { componentsVisible } from "@/types/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVisible } from "../action";
import { getStateVisible } from "../getter";

export const useStateVisibel = () => useSelector(getStateVisible)

export function useDispatchVisibel() {
  const dispatch = useDispatch()
  const stateSetVisible = useCallback((key:keyof componentsVisible, val:boolean) => dispatch(setVisible(key, val)), [dispatch])
  return {
    stateSetVisible
  }
}