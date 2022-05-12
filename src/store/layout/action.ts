import * as ActionTypes from "./actionTypes";
import { LayoutMode } from "@/types"

export const changeLayoutMode = (mode: LayoutMode): {
  type: LayoutMode;
  mode: LayoutMode;
} => ({
  type: ActionTypes.SINGLE_COLUMN,
  mode,
});
