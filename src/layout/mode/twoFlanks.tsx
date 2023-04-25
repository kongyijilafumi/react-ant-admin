import { Layout } from "antd";
import Header from "../header";
import Menu from "../siderMenu";
import TopMenu from "../topMenu";
import Footer from "../footer";
import Router from "@/router";
import { LayoutModeProps } from "./index"
import { useStyle } from "../style"
const { Content } = Layout;

const TwoFlanks = ({ visible }: LayoutModeProps) => {
  const { styles } = useStyle()
  return (
    <Layout className="my-layout-body twoflanks">
      <Menu />
      <Layout className="layout-content-wrap reset-padding">
        <Header children={null} />
        {visible.topMenu && <TopMenu />}
        <Content className={styles.layoutContentBody}>
          <Router />
        </Content>
        {visible.footer && <Footer />}
      </Layout>
    </Layout>
  );
};

export default TwoFlanks;
