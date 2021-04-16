import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { connect } from "react-redux";
import MyIcon from "@/components/icon";
import { saveUser, getLocalUser } from "@/utils";
import { setUserInfoAction } from "@/store/action";
import "./index.less";

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (info) => dispatch(setUserInfoAction(info)),
});
const IPT_RULE_USERNAME = [
  {
    required: true,
    message: "请输入用户名",
  },
];

const IPT_RULE_PASSWORD = [
  {
    required: true,
    message: "请输入密码",
  },
];
function Login({ setUserInfo }) {
  const [btnLoad, setBtnLoad] = useState(false);
  const onFinish = (values) => {
    setBtnLoad(true);
    setTimeout(() => {
      setBtnLoad(false);
      if (values.username.includes("admin")) {
        values.type = 0;
      } else {
        values.type = 1;
      }
      if (values.remember) {
        saveUser(values);
      }
      message.success("登录成功！");
      setUserInfo(values);
    }, 1000);
  };
  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="title">react-ant-admin</div>
        <div className="welcome">欢迎使用，请先登录</div>
        <Form
          className="login-form"
          initialValues={{
            remember: true,
            ...getLocalUser(),
          }}
          onFinish={onFinish}
        >
          <Form.Item name="username" rules={IPT_RULE_USERNAME}>
            <Input
              prefix={<MyIcon type="icon_nickname" />}
              placeholder="用户名:admin/user"
            />
          </Form.Item>
          <Form.Item name="password" rules={IPT_RULE_PASSWORD}>
            <Input
              prefix={<MyIcon type="icon_locking" />}
              type="password"
              placeholder="密码:123"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item className="btns">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={btnLoad}
            >
              登录
            </Button>
            <Button htmlType="reset">重置</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(Login);
