import React from "react";
import { Layout } from "antd";
import "./index.less";
const { Content } = Layout;

const LayoutBody = ({ header, menu, content, topMenu }) => {
  return (
    <Layout className="layout-body">
      {header}
      <Layout>
        {menu}
        <Layout className="layout-content-wrap">
          {topMenu}
          <Content className="site-layout-background layout-content-body">
            {content}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutBody;
