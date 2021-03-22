import React from "react";
import { connect } from "react-redux";
import Dnd from "@/components/Dnd"
const mapStateToProps = (state) => ({ openedMenu: state.global.openedMenu });
const DndItemStyle = {
  width: 200,
  height: 50,
  border: "1px solid #e9e9e9",
  borderRadius: "5px 5px 0",
  lineHeight: "50px"
}
const DndBodyStyle = {
  display: "flex"

}
function TopMenu({ openedMenu }) {
  return (
    <div className="top-menu">
      <Dnd itemStyle={DndItemStyle} rangeVal={openedMenu} bodyStyle={DndBodyStyle} />
    </div>
  );
}

export default connect(mapStateToProps, null)(TopMenu);
