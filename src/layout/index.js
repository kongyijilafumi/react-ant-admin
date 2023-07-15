import { FullScreen, SingleColumn, TowColumn, TwoFlanks } from "./mode";
import * as ActionTypes from "../store/layout/actionTypes";
import "./index.less";
import { useStateLayout, useStateVisibel } from "@/store/hooks";

export default function LayoutContainer() {
  const LayoutMode = useStateLayout()
  const visibel = useStateVisibel()
  switch (LayoutMode) {
    case ActionTypes.SINGLE_COLUMN:
      return <SingleColumn visibel={visibel} />;
    case ActionTypes.TWO_COLUMN:
      return <TowColumn visibel={visibel} />;
    case ActionTypes.TWO_FLANKS:
      return <TwoFlanks visibel={visibel} />;
    case ActionTypes.FULL_SCREEN:
      return <FullScreen />
    default:
      return <TowColumn visibel={visibel} />;
  }
}
