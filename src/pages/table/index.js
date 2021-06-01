import React, { useEffect, useState } from "react";
import { Table } from "antd";

const pagination = {
  showTotal: (total) => `总数：${total}`,
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 50, 100],
};

function useTables() {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const col = Array.from({ length: 8 }, (v, k) => {
      return {
        title: "col" + k,
        dataIndex: "col" + k,
        key: "col" + k,
      };
    });
    const data = Array.from({ length: 20 }, (v, k) => {
      const temp = {
        key: Math.random(),
      };
      col.forEach((i) => {
        temp[i.dataIndex] = Math.ceil(Math.random() * 50);
      });
      return temp;
    });
    setTableData(data);
    setColumns(col);
  }, []);
  return { tableData, columns };
}

export default function Tables() {
  const { tableData, columns } = useTables();
  return (
    <div>
      <h2>ant 表格</h2>
      <Table dataSource={tableData} columns={columns} pagination={pagination} />
    </div>
  );
}
