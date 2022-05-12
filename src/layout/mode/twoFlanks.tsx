import { Layout } from "antd";
import Header from "../header";
import Menu from "../siderMenu";
import TopMenu from "../topMenu";
import Footer from "../footer";
import Router from "@/router";
import { LayoutModeProps } from "./index"
const { Content } = Layout;

const TwoFlanks = ({ visibel }: LayoutModeProps) => {
  return (
    <Layout className="my-layout-body twoflanks">
      <Menu />
      <Layout className="layout-content-wrap reset-padding">
        <Header children={null} />
        {visibel.topMenu && <TopMenu />}
        <Content className="layout-content-body">
          <Router />
        </Content>
        {visibel.footer && <Footer />}
      </Layout>
    </Layout>
  );
};

export default TwoFlanks;
