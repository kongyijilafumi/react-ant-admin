import * as actionTypes from "./actionTypes";
import { getLayoutMode } from "@/utils";
const localLayout = getLayoutMode()
const layout = (Array.isArray(localLayout) && localLayout) || [actionTypes.TWO_COLUMN];

export default function reducer(state = layout, action) {
  const { type, mode } = action;
  switch (type) {
    case "push": {
      if (!mode) {
        return state
      }
      let lastMode = state[state.length - 1]
      console.log(mode, lastMode);
      if (lastMode === mode) {
        return state
      }
      const sliceNum = state.length > 1 ? 1 : 0
      return state.slice(sliceNum).concat(mode)
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
