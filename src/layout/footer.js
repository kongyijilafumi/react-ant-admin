import { Layout } from "antd";
const { Footer } = Layout;

export default function BottomFooter() {
  return (
    <Footer className="footer">
      <p>
        <a href="https://azhengpersonalblog.top/doc-react-ant-admin" target="_blank" rel="noreferrer">
          react-ant-admin文档地址
        </a>
      </p>
      <p>
        <a href="mailto:1369501150@qq.com" target="_blank" rel="noreferrer" >
          邮箱联系我
        </a>
      </p>
      <p>备案/许可证编号：湘ICP备20007569号</p>
      <p>react-ant-admin ©2021 Created by azheng</p>
    </Footer>
  );
}
