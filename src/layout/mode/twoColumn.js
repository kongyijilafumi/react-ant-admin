import { Layout } from "antd";
import Header from "../header";
import Menu from "../siderMenu";
import TopMenu from "../topMenu";
import Footer from "../footer";
import Router from "@/router";

const { Content } = Layout;

const TowColumn = ({ visibel }) => {
  return (
    <Layout className="my-layout-body">
      <Header />
      <Layout>
        <Menu />
        <Layout className="layout-content-wrap">
          {visibel.topMenu && <TopMenu />}
          <Content className=" layout-content-body">
            <Router />
          </Content>
          {visibel.footer && <Footer />}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TowColumn;
