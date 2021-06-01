import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Row, Col, Descriptions } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function useForms() {
  const [info, setInfo] = useState({});
  const onFinish = (values) => {
    setInfo(values);
  };
  return { info, onFinish };
}
export default function Forms() {
  const { info, onFinish } = useForms();
  return (
    <div>
      <h2>ant Form</h2>
      <Row>
        <Col span={6}>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="age"
              label="Age"
              rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item name="website" label="Website">
              <Input />
            </Form.Item>
            <Form.Item name="introduction" label="Introduction">
              <Input.TextArea />
            </Form.Item>
            <Row justify="space-around">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="ghost" htmlType="reset">
                Reset
              </Button>
            </Row>
          </Form>
        </Col>
        <Col span={10} offset={2}>
          <Descriptions title="User Info" bordered>
            {Object.keys(info).map((item) => (
              <Descriptions.Item label={item} key={item}>
                {info[item]}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Col>
      </Row>
    </div>
  );
}
