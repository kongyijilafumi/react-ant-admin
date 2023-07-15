import { Layout } from "antd";
const { Footer } = Layout;

export default function BottomFooter() {
  return (
    <Footer className="footer">
      <p>
        <a
          href="https://z3web.cn/doc-react-ant-admin"
          target="_blank"
          rel="noreferrer"
        >
          react-ant-admin文档地址
        </a>
      </p>
      <p>
        <a
          href="https://jq.qq.com/?_wv=1027&k=pzP2acC5"
          target="_blank"
          rel="noreferrer"
        >
          qq交流群
        </a>
      </p>
      <p>备案/许可证编号：湘ICP备20007569号</p>
      <p>react-ant-admin ©2021 Created by azheng</p>
    </Footer>
  );
}
