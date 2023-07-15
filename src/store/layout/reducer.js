import * as actionTypes from "./actionTypes";
import { getLayoutMode } from "@/utils";

const layout = getLayoutMode() || actionTypes.TWO_COLUMN;

export default function reducer(state = layout, action) {
  const { type, mode } = action;
  switch (type) {
    case "change": {
      state = mode;
      return state;
    }
    default: {
      return state;
    }
  }
}
