import { LayoutMode } from "@/types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLayoutMode } from "../action";
import { getStateLayout } from "../getter";

export const useStateLayout = () => useSelector(getStateLayout)

export function useDispatchLayout() {
  const dispatch = useDispatch()
  const stateChangeLayout = useCallback((mode: LayoutMode) => dispatch(changeLayoutMode(mode)), [dispatch])
  return {
    stateChangeLayout
  }
}