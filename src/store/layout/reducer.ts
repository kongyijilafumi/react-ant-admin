import * as actionTypes from "./actionTypes";
import { getLayoutMode } from "@/utils";
import { LayoutAction, LayoutMode } from "@/types"

const layout: LayoutMode[] = getLayoutMode() || [actionTypes.TWO_COLUMN];

export default function reducer(state = layout, action: LayoutAction) {
  const { type, mode } = action;
  switch (type) {
    case "push": {
      if (!mode) {
        return state
      }
      let lastMode = state[state.length - 1]
      if (lastMode === mode) {
        return state
      }
      const sliceNum = state.length > 1 ? 1 : 0
      state = state.slice(sliceNum).concat(mode)
      return state
    }
    case "pop": {
      if (state.length > 1) {
        state = state.slice(0, 1)
      } else {
        state = layout
      }
      return state
    }
    default: {
      return state
    }
  }
}
