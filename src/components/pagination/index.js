import React, { useEffect, useState } from "react";
import { Row, Pagination } from "antd";
import "./index.less";
const pageSizeOptions = [10, 20, 50, 100];

export default function MyPagination({ total, change, immediately }) {
  const [page, setPage] = useState(1);
  const [pagesize, setSize] = useState(pageSizeOptions[0]);
  useEffect(() => {
    if (typeof immediately === "function") {
      immediately({ page, pagesize });
    }
    // eslint-disable-next-line
  }, []);
  const pageChange = (page, pagesize) => {
    setPage(page);
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
