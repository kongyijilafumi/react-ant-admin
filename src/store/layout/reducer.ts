import * as actionTypes from "./actionTypes";
import { getLayoutMode } from "@/utils";
import { LayoutAction } from "@/types"

const layout = getLayoutMode() || actionTypes.TWO_COLUMN;

export default function reducer(state = layout, action: LayoutAction) {
  const { type, mode } = action;
  switch (type) {
    case actionTypes.SINGLE_COLUMN:
    case actionTypes.TWO_COLUMN: {
      state = mode;
      return state;
    }
    default: {
      return state;
    }
  }
}
