import React from "react";
import { connect } from "react-redux";
import MenuDnd from "@/components/menuDnd";
import { withRouter } from "react-router-dom";
import { filterOpenKey, setSelectKey, setOpenKey } from "@/store/action";
const mapStateToProps = (state) => ({
  openedMenu: state.global.openedMenu,
  currentKey: state.global.selectMenuKey[0],
});

const mapDispatchToProps = (dispatch) => ({
  filterKey: (key) => dispatch(filterOpenKey(key)),
  setSelectKey: (key) => dispatch(setSelectKey([key])),
  setOpenKey: (key) => dispatch(setOpenKey([key])),
});

function TopMenu({
  openedMenu,
  currentKey,
  filterKey,
  setSelectKey,
  history,
  setOpenKey,
}) {
  const closeTopMenu = (closeKey, nextItem, isCurrent) => {
    filterKey(closeKey);
    if (nextItem && isCurrent) {
      history.replace(nextItem.path);
      setSelectKey(nextItem.key);
      setOpenKey(nextItem.parentKey);
    }
  };

  const gotoMenuUrl = (item) => {
    if (item.key === currentKey) return;
    history.replace(item.path);
    setSelectKey(item.key);
    setOpenKey(item.parentKey);
  };
  return (
    <div className="top-menu">
      <MenuDnd
        currentKey={currentKey}
        rangeVal={openedMenu}
        onClose={closeTopMenu}
        onChoose={gotoMenuUrl}
      />
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopMenu));
