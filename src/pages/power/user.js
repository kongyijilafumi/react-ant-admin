import React, { useMemo, useState } from "react";
import { Button, Table, Row, Col } from "antd";
import MyPagination from "@/components/pagination";
import UserModal from "@/components/modal/user";
import { getUserList } from "@/api";
import "./index.scss";

export default function User() {
  const [tableData, setData] = useState([]);
  const [tableCol, setCol] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShow] = useState(false);
  const [chooseId, setId] = useState(null);
  const activeCol = {
    dataIndex: "active",
    key: "active",
    title: "操作",
    align: "center",
    render: () => <Button type="link">编辑</Button>,
  };

  const getUserData = (data) => {
    getUserList(data).then((res) => {
      const { data, status, total } = res;
      if (status === 0 && data) {
        const { mapKey, list } = data;
        mapKey.push(activeCol);
        setCol(mapKey);
        setTotal(total);
        setData(list);
      }
    });
  };
  const showInfoModal = (id, type) => {
    if (id) {
      setId(id);
    } else {
      setId(null);
    }
    setShow(type);
  };
  const tableTop = useMemo(
    () => (
      <Row justify="space-between" align="center" gutter={80}>
        <Col style={{ lineHeight: "32px" }}>用户信息列表</Col>
        <Col>
          <Button type="primary" onClick={() => showInfoModal(null,true)}>
            添加消息
          </Button>
        </Col>
      </Row>
    ),
    []
  );

  return (
    <div className="user-container">
      <Table
        title={() => tableTop}
        dataSource={tableData}
        rowKey="user_id"
        columns={tableCol}
        pagination={false}
      />
      <MyPagination
        total={total}
        immediately={getUserData}
        change={getUserData}
      />
      <UserModal
        isShow={showModal}
        user_id={chooseId}
        onCancel={showInfoModal}
      />
    </div>
  );
}
