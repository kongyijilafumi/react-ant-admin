import { SingleColumn, TowColumn, TwoFlanks } from "./mode";
import { connect } from "react-redux";
import * as ActionTypes from "../store/layout/actionTypes";
import "./index.less";
const mapStateToProps = (state) => ({
  LayoutMode: state.layout,
  visibel: state.componentsVisible,
});
function LayoutContainer({ LayoutMode, visibel }) {
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

export default connect(mapStateToProps, null)(LayoutContainer);
