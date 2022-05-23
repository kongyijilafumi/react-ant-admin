import { SingleColumn, TowColumn, TwoFlanks } from "./mode";
import { useSelector } from "react-redux";
import * as ActionTypes from "../store/layout/actionTypes";
import { getComponentsVisible, getLayoutMode } from "@/store/getters";
import "./index.less";

export default function LayoutContainer() {
  const LayoutMode = useSelector(getLayoutMode)
  const visibel = useSelector(getComponentsVisible)
  switch (LayoutMode) {
    case ActionTypes.SINGLE_COLUMN:
      return <SingleColumn visibel={visibel} />;
    case ActionTypes.TWO_COLUMN:
      return <TowColumn visibel={visibel} />;
    case ActionTypes.TWO_FLANKS:
      return <TwoFlanks visibel={visibel} />;
    default:
      return null;
  }
}
