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
    filterKey(path);
    if (nextItem && isCurrent) {
      let parentPath = nextItem.parentPath || "";
      history.replace(parentPath + nextItem.path);
    }
  };

  const gotoMenuUrl = (item) => {
    if (item.path === getCurrentUrl()) return;
    let parentPath = item.parentPath || "";
    history.replace(parentPath + item.path);
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