import React, { useState } from "react";
import { Card, Avatar, Row, Col, Typography, Modal, Form, Input } from "antd";
import MyIcon from "@/components/icon";
import "./index.less";

const list = [
  {
    img: "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
    title: "Ant Design",
    description:
      "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
  },
  {
    img: "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
    title: "React",
    description:
      "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
  },
  {
    img: "http://www.axios-js.com/logo.svg",
    title: "axios",
    description:
      "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
  },
  {
    img: "https://webpack.docschina.org/icon-square-small.85ba630cf0c5f29ae3e3.svg",
    title: "Webpack",
    description:
      "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
  },
];

const { Meta } = Card;
const dRules = [
  {
    required: true,
    message: "Please input your description!",
  },
  {
    min: 50,
    message: "The description must be more than 50 words!",
  },
];
const tRules = [
  {
    required: true,
    message: "Please input your title!",
  },
];
const iRules = [
  {
    required: true,
    message: "Please input your img!",
  },
];
function useCardPage() {
  const [dataList, setList] = useState(list);
  const [showModal, setShow] = useState(false);
  const [form] = Form.useForm();

  const show = () => {
    setShow(true);
  };
  const hide = () => {
    setShow(false);
  };
  const addList = () => {
    form.validateFields().then((values) => {
      setList([...dataList, values]);
      form.resetFields();
      hide();
    });
  };
  return { show, dataList, showModal, hide, addList, form };
}

export default function CardPage() {
  const { show, showModal, addList, dataList, hide, form } = useCardPage();
  return (
    <div className="card-container">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card hoverable className="add-wapper" onClick={show}>
            <MyIcon type="icon_increase" />
            <p>新增</p>
          </Card>
        </Col>
        {dataList.map((item) => (
          <Col span={6} key={item.title}>
            <Card
              hoverable
              actions={[
                <MyIcon type="icon_edit" className="icon" />,
                <MyIcon className="icon" type="icon_setting" />,
              ]}
            >
              <Meta
                avatar={<Avatar src={item.img} />}
                title={item.title}
                description={
                  <Typography.Paragraph ellipsis={{ rows: 3, suffix: "..." }}>
                    {item.description}
                  </Typography.Paragraph>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="添加列表"
        visible={showModal}
        cancelText="取消"
        okText="添加"
        onOk={addList}
        onCancel={hide}
      >
        <Form form={form}>
          <Form.Item label="图片链接" name="img" rules={iRules}>
            <Input />
          </Form.Item>
          <Form.Item label="标题" name="title" rules={tRules}>
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="description" rules={dRules}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
CardPage.route={ path:"/list/card" }
