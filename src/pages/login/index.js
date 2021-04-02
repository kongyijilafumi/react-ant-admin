import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { saveLocalUserInfo } from "@/utils";
import { setUserInfoAction } from "@/store/action";
import "./index.less";

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (info) => dispatch(setUserInfoAction(info)),
});

function Login({ setUserInfo }) {
  const [btnLoad, setBtnLoad] = useState(false);
  const onFinish = (values) => {
    setBtnLoad(true);
    setTimeout(() => {
      setUserInfo(values);
      setBtnLoad(false);
      if (values.remember) {
        saveLocalUserInfo(values);
      }
    }, 1000);
  };
  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="title">React-ant-admin</div>
        <div className="welcome">欢迎使用，请先登录</div>
        <Form
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
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
