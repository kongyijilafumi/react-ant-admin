import { Layout } from "antd";
import Header from "../header";
import Menu from "../siderMenu";
import TopMenu from "../topMenu";
import Footer from "../footer";
import Router from "@/router";
import { LayoutModeProps } from "./index"
import { useStyle } from "../style"
const { Content } = Layout;

const TowColumn = ({ visible }: LayoutModeProps) => {
  const { styles } = useStyle()
  return (
    <Layout className="my-layout-body">
      <Header children={null} />
      <Layout>
        <Menu />
        <Layout className="layout-content-wrap">
          {visible.topMenu && <TopMenu />}
          <Content className={styles.layoutContentBody}>
            <Router />
          </Content>
          {visible.footer && <Footer />}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TowColumn;
