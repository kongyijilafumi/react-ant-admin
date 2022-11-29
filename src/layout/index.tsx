import { FullScreen, SingleColumn, TowColumn, TwoFlanks } from "./mode";
import * as ActionTypes from "../store/layout/actionTypes";
import "./index.less";
import { useStateLayout, useStateVisibel } from "@/store/hooks";

const LayoutContainer = () => {
  const LayoutMode = useStateLayout()
  const visible = useStateVisibel()
  switch (LayoutMode) {
    case ActionTypes.SINGLE_COLUMN:
      return <SingleColumn visible={visible} />;
    case ActionTypes.TWO_COLUMN:
      return <TowColumn visible={visible} />;
    case ActionTypes.TWO_FLANKS:
      return <TwoFlanks visible={visible} />;
    case ActionTypes.FULL_SCREEN:
      return <FullScreen />
    default:
      return <TowColumn visible={visible} />;
  }
}

export default LayoutContainer
