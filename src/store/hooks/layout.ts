import { LayoutMode, LayoutModeType } from "@/types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLayoutMode } from "../action";
import { getStateLayout } from "../getter";

type SetLayoutFn = {
  (type: LayoutModeType, mode: LayoutMode | undefined): void
  (type: 'push', mode: LayoutMode): void
  (type: 'pop', mode?: undefined): void
}

export const useStateLayout = () => useSelector(getStateLayout)
export function useDispatchLayout() {
  const dispatch = useDispatch()
  const stateChangeLayout = useCallback<SetLayoutFn>((type, mode) => {
    dispatch(changeLayoutMode(type, mode))
  }, [dispatch])
  return {
    stateChangeLayout
  }
}
