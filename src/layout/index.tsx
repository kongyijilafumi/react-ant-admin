import { SingleColumn, TowColumn, TwoFlanks } from "./mode";
import { connect } from "react-redux";
import * as ActionTypes from "../store/layout/actionTypes";
import { State } from "@/types"
import "./index.less";

interface Props {
  LayoutMode: State["layout"]
  visibel: State["componentsVisible"]
}

const mapStateToProps = (state: State) => ({
  LayoutMode: state.layout,
  visibel: state.componentsVisible,
});

const LayoutContainer = ({ LayoutMode, visibel }: Props) => {
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

export default connect(mapStateToProps, () => ({}))(LayoutContainer);
