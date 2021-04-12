import React from "react";
import { connect } from "react-redux";
import MenuDnd from "@/components/menu-dnd";
import { withRouter } from "react-router-dom";
import { filterOpenKey } from "@/store/action";
import { getCurrentUrl } from "@/utils";
const mapStateToProps = (state) => ({
  openedMenu: state.global.openedMenu,
});

const mapDispatchToProps = (dispatch) => ({
  filterKey: (key) => dispatch(filterOpenKey(key)),
});

function TopMenu({ openedMenu, filterKey, history }) {

  const closeTopMenu = (path, nextItem, isCurrent) => {
    if (nextItem && isCurrent) {
      debugger
      filterKey(path);
      history.replace(nextItem.path);
    }
  };

  const gotoMenuUrl = (item) => {
    if (item.path === getCurrentUrl()) return;
    history.replace(item.path);
  };
  
  return (
    <div className="top-menu">
      <MenuDnd
        currentKey={getCurrentUrl()}
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
