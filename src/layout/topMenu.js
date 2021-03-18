import React from "react";
import { connect } from "react-redux";
import { Breadcrumb } from "antd";
const mapStateToProps = (state) => ({ openedMenu: state.global.openedMenu });
function TopMenu({ openedMenu }) {
  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        {openedMenu.map((item) => {
          return <Breadcrumb.Item key={item.key}>{item.title}</Breadcrumb.Item>;
        })}
      </Breadcrumb>
    </div>
  );
}

export default connect(mapStateToProps, null)(TopMenu);
