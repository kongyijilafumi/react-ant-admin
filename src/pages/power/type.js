import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "antd";
import TypeModal from "@/components/modal/type";
import { getPower } from "@/api";
import MyTable from "@/components/table";
import "./index.less";

function formatMenuKey(list, parentId = null) {
  return list.map((item) => {
    item.parentId = parentId
    item.key = item.menu_id;
    if (item.children) {
      item.children = formatMenuKey(item.children, item.menu_id);
    }
    return item;
  });
}

function useTypes() {
  const [showModal, setShow] = useState(false);
  const [tableData, setData] = useState([]);
  const [tableCol, setCol] = useState([]);
  const [choose, setChoose] = useState(null);
  const [menuList, setMenuList] = useState(null);
  useEffect(() => {
    getTypeData();
    // eslint-disable-next-line
  }, []);
  const modalControl = (info, open) => {
    setChoose(info);
    setShow(open);
  };
  const activeCol = {
    dataIndex: "active",
    key: "active",
    title: "操作",
    align: "center",
    render: (text, record) => (
      <Button type="link" onClick={() => modalControl(record, true)}>
        编辑
      </Button>
    ),
  };

  const renderTitle = () => (
    <Row justify="space-between" align="center" gutter={80}>
      <Col style={{ lineHeight: "32px" }}>用户信息列表</Col>
      <Col>
        <Button type="primary" onClick={() => modalControl(null, true)}>
          添加管理权限
        </Button>
      </Col>
    </Row>
  );

  function getTypeData() {
    getPower().then((res) => {
      if (res.status === 0) {
        res.mapKey.push(activeCol);
        setMenuList(formatMenuKey(res.menu));
        setData(res.data);
        setCol(res.mapKey);
      }
    });
  }
  return {
    renderTitle,
    tableCol,
    tableData,
    showModal,
    choose,
    modalControl,
    getTypeData,
    menuList,
  };
}

export default function Types() {
  const {
    renderTitle,
    tableCol,
    tableData,
    showModal,
    choose,
    menuList,
    modalControl,
    getTypeData,
  } = useTypes();
  return (
    <div className="type-container">
      <MyTable
        rowKey="type_id"
        saveKey="typeTable"
        title={renderTitle}
        columns={tableCol}
        dataSource={tableData}
      />
      <TypeModal
        isShow={showModal}
        info={choose}
        menuList={menuList}
        onCancel={modalControl}
        onOk={getTypeData}
      />
    </div>
  );
}

Types.route = { path: "/power/type" };
