import React, { useState } from "react";
import { Table } from "antd";
import MyPagination from "@/components/pagination";
import { getUserList } from "@/api";
import "./index.scss";

export default function User() {
  const [tableData, setData] = useState([]);
  const [tableCol, setCol] = useState([]);
  const [total, setTotal] = useState(0);
  return (
    <div className="user-container">
      <Table dataSource={tableData} columns={tableCol} pagination={false} />
      <MyPagination />
    </div>
  );
}
