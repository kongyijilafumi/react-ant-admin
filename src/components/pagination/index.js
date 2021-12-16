import React, { useEffect, useState } from "react";
import { Row, Pagination } from "antd";
import "./index.less";
const pageSizeOptions = [10, 20, 50, 100];

export default function MyPagination({ total, page = 1, change, immediately }) {
  const [pagesize, setSize] = useState(pageSizeOptions[0]);
  useEffect(() => {
    if (typeof immediately === "function") {
      immediately({ page, pagesize });
    }
    // eslint-disable-next-line
  }, []);
  const pageChange = (page, pagesize) => {
    setSize(pagesize);
    if (typeof change === "function") {
      change({ page, pagesize });
    }
  };
  return (
    <Row justify="end" className="pagination-wapper">
      <Pagination
        showSizeChanger
        onChange={pageChange}
        current={page}
        total={total}
        pageSizeOptions={pageSizeOptions}
      />
    </Row>
  );
}
