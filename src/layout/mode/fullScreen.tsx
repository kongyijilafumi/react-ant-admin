import { Layout } from "antd";
import Router from "@/router";
import { useStyle } from "../style"
const { Content } = Layout;

export default function FullScreen() {
  const { styles } = useStyle()
  return <Layout className="my-layout-body">
    <Layout className="layout-content-wrap">
      <Content className={styles.layoutContentBody}>
        <Router />
      </Content>
    </Layout>
  </Layout>
}