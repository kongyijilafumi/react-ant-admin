import { SingleColumn, TowColumn, TwoFlanks } from "./mode";
import { useSelector } from "react-redux";
import * as ActionTypes from "../store/layout/actionTypes";
import "./index.less";
import { getStateLayout, getStateVisible } from "@/store/getter";

const LayoutContainer = () => {
  const LayoutMode = useSelector(getStateLayout)
  const visible = useSelector(getStateVisible)
  switch (LayoutMode) {
    case ActionTypes.SINGLE_COLUMN:
      return <SingleColumn visible={visible} />;
    case ActionTypes.TWO_COLUMN:
      return <TowColumn visible={visible} />;
    case ActionTypes.TWO_FLANKS:
      return <TwoFlanks visible={visible} />;
    default:
      return null;
  }
}

export default LayoutContainer
