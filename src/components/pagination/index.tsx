import React, { useEffect, useState } from "react";
import { Row, Pagination } from "antd";
import "./index.less";
const pageSizeOptions = ["10", "20", "50", "100"];

export type PageInfo = { page: number, pagesize?: number | string }

interface PaginationProps {
  total: number
  page: number
  change: (p: PageInfo) => void
  immediately?: (p: PageInfo) => void
}

export default function MyPagination({ total, page = 1, change, immediately }: PaginationProps) {
  const [pagesize, setSize] = useState<string>(pageSizeOptions[0]);
  useEffect(() => {
    if (typeof immediately === "function") {
      immediately({ page, pagesize });
    }
    // eslint-disable-next-line
  }, []);
  const pageChange = (page: number, pagesize?: number) => {
    setSize(pagesize + '' || pageSizeOptions[0]);
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
