import React, { useCallback, useMemo, useState } from "react";
import { Button, Row, Col } from "antd";
import MyPagination from "@/components/pagination";
import UserModal from "@/components/modal/user";
import MyTable from "@/components/table";
import { getUserList } from "@/api";
import "./index.less";

export default function User() {
  const [tableData, setData] = useState([]);
  const [tableCol, setCol] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShow] = useState(false);
  const [chooseId, setId] = useState(null);
  const [pageData, setPage] = useState(null);
  // 显示弹窗
  const showInfoModal = useCallback((id, type) => {
    if (id) {
      setId(id);
    } else {
      setId(null);
    }
    setShow(type);
  }, []);

  //
  const showEdit = useCallback(
    (id) => {
      showInfoModal(id, true);
    },
    [showInfoModal]
  );
  const activeCol = useMemo(
    () => ({
      dataIndex: "active",
      key: "active",
      title: "操作",
      align: "center",
      render: (text, record) => (
        <Button type="link" onClick={() => showEdit(record.user_id)}>
          编辑
        </Button>
      ),
    }),
    [showEdit]
  );
  const renderTitle = useCallback(
    () => (
      <Row justify="space-between" align="center" gutter={80}>
        <Col style={{ lineHeight: "32px" }}>用户信息列表</Col>
        <Col>
          <Button type="primary" onClick={() => showInfoModal(null, true)}>
            添加用户
          </Button>
        </Col>
      </Row>
    ),
    [showInfoModal]
  );
  const getUserData = useCallback(
    (data) => {
      setPage(data);
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
    },
    [activeCol]
  );
  const updateUserData = useCallback(() => {
    getUserData(pageData);
  }, [pageData, getUserData]);
  return (
    <div className="user-container">
      <MyTable
        title={renderTitle}
        dataSource={tableData}
        rowKey="user_id"
        saveKey="userTable"
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
        onOk={updateUserData}
      />
    </div>
  );
}

User.route = { path: "/power/user" };
