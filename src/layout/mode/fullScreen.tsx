import { Layout } from "antd";
import Router from "@/router";
const { Content } = Layout;

export default function FullScreen() {
  return <Layout className="my-layout-body">
    <Layout className="layout-content-wrap">
      <Content className=" layout-content-body">
        <Router />
      </Content>
    </Layout>
  </Layout>
}