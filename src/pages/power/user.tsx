import { useState } from "react";
import { Button, Row, Col } from "antd";
import MyPagination, { PageInfo } from "@/components/pagination";
import UserModal, { UserID } from "@/components/modal/user";
import { getUserList } from "@/api";
import "./index.less";
import MyTable from "@/components/table";
import { MapKey, ResponseUserInfo } from "@/types"

export default function User() {
  const [tableData, setData] = useState<ResponseUserInfo[]>([]);
  const [tableCol, setCol] = useState<MapKey>([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShow] = useState(false);
  const [chooseId, setId] = useState<UserID>(null);
  const [pageData, setPage] = useState<PageInfo>({ page: 1 });
  // 显示弹窗
  const showInfoModal = (id: UserID, type: boolean) => {
    if (id) {
      setId(id);
    } else {
      setId(null);
    }
    setShow(type);
  }

  const activeCol = {
    dataIndex: "active",
    key: "active",
    title: "操作",
    align: "center",
    render: (text: string, record: ResponseUserInfo) => (
      <Button type="link" onClick={() => showInfoModal(record.user_id, true)}>
        编辑
      </Button>
    ),
  }

  const renderTitle = () => (
    <Row justify="space-between" gutter={80}>
      <Col style={{ lineHeight: "32px" }}>用户信息列表</Col>
      <Col>
        <Button type="primary" onClick={() => showInfoModal(null, true)}>
          添加用户
        </Button>
      </Col>
    </Row>
  )
  const getUserData = (data: any) => {
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
  }
  const updateUserData = () => {
    getUserData(pageData);
  }

  return (
    <div className="user-container">
      <MyTable
        title={renderTitle}
        dataSource={tableData}
        rowKey="user_id"
        columns={tableCol}
        pagination={false}
      />
      <MyPagination
        page={pageData.page}
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

User.route = { [MENU_PATH]: "/power/user" };
