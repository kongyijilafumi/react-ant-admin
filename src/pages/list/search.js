import React, { useEffect, useState } from "react";
import {
  Form,
  Table,
  Input,
  Modal,
  Button,
  Row,
  Col,
  Spin,
  message,
  Pagination,
} from "antd";
import { getMsg, addMsg } from "@/api";
import "./index.scss";

const pageSizeOptions = [10, 20, 50, 100];

export default function SearchPage() {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);
  const [tableData, setData] = useState([]);
  const [tableCol, setCol] = useState([]);
  const [load, setLoad] = useState(true);
  const [total, setTotal] = useState(0);
  const [showModal, setShow] = useState(false);

  // 初次加载
  useEffect(() => {
    getDataList({ pagesize, page });
    // eslint-disable-next-line
  }, []);

  // 获取列表
  const getDataList = (data) => {
    getMsg(data).then((res) => {
      const { data, status } = res;
      if (status === 0) {
        let { list, total, mapKey } = data;
        mapKey = mapKey.map((i) => {
          if (i.key === "description") {
            i.width = 500;
          }
          return i;
        });
        setCol(mapKey);
        setTotal(total);
        setData(list.map((i) => ({ ...i, key: i.m_id })));
        setLoad(false);
        return;
      }
    });
  };

  // 添加列表
  const addList = () => {
    form.validateFields().then((values) => {
      addMsg(values).then((res) => {
        if (res.status === 0) {
          form.resetFields();
          message.success(res.msg);
          setShow(false);
          search();
          return;
        }
        message.error(res.msg);
      });
    });
  };

  // 顶部搜索
  const search = () => {
    let data = searchForm.getFieldsValue();
    getDataList({ page, pagesize, ...data });
  };

  // 页码改版
  const pageChange = (page, pagesize) => {
    setPage(page);
    setPagesize(pagesize);
    let data = searchForm.getFieldsValue();
    getDataList({ page, pagesize, ...data });
  };

  const tableTop = (
    <Row justify="space-between" align="center" gutter={80}>
      <Col style={{ lineHeight: "32px" }}>表格查询</Col>
      <Col>
        <Button type="primary" onClick={() => setShow(true)}>
          添加消息
        </Button>
      </Col>
    </Row>
  );
  return (
    <div className="search-container">
      <Spin spinning={load}>
        <div className="top-form">
          <Form layout="inline" form={searchForm}>
            <Form.Item name="name">
              <Input placeholder="输入消息名称" />
            </Form.Item>
            <Form.Item name="description">
              <Input placeholder="输入消息描述词" />
            </Form.Item>
            <Button onClick={search} type="primary" className="submit-btn">
              搜索
            </Button>
            <Button
              onClick={() => {
                searchForm.resetFields();
                search();
              }}
            >
              清空
            </Button>
          </Form>
        </div>
        <Table
          title={() => tableTop}
          dataSource={tableData}
          columns={tableCol}
          pagination={false}
        />
        <Row justify="end" className="pagination-wapper">
          <Pagination
            showSizeChanger
            onChange={pageChange}
            current={page}
            total={total}
            pageSizeOptions={pageSizeOptions}
          />
        </Row>
      </Spin>
      <Modal
        title="添加一条记录"
        visible={showModal}
        cancelText="取消"
        okText="添加"
        onOk={() => addList()}
        onCancel={() => setShow(false)}
      >
        <Form form={form}>
          <Form.Item
            label="消息名称"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="消息描述"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
              {
                min: 10,
                message: "The description must be more than 10 words!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
