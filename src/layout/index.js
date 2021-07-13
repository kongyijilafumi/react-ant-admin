import React from "react";
import { Layout } from "antd";
import Header from "./header";
import Menu from "./siderMenu";
import TopMenu from "./topMenu";
import Footer from "./footer";
import Router from "@/router";
import * as LayoutTypes from "../store/layout/actionTypes";
import { connect } from "react-redux";
import "./index.less";
const { Content } = Layout;

const LayoutBody = ({ layout }) => {
  return (
    <Layout className="my-layout-body">
      <Header children={layout === LayoutTypes.TWO_COLUMN ? null : <Menu />} />
      <Layout>
        {layout === LayoutTypes.TWO_COLUMN ? <Menu /> : null}
        <Layout className="layout-content-wrap">
          <TopMenu />
          <Content className="site-layout-background layout-content-body">
            <Router />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};
const mapStateToProps = (state) => ({ layout: state.layout });

export default connect(mapStateToProps, null)(LayoutBody);
