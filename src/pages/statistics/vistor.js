import React, { useEffect, useState } from "react";
import { Row, Col, Table, Pagination, Card } from "antd";
import { getVistor } from "@/api";
import Echarts from "@/components/echarts";
import "./index.scss";

const pageSizeOptions = [10, 20, 50, 100];
const option = {
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "data"],
    show: false,
  },
  yAxis: {
    show: false,
  },
  tooltip: {},
  grid: {
    height: "100%",
    width: "90%",
    left: "5%",
    right: "5%",
    bottom: "0%",
    top: "0%",
  },
  series: [
    {
      data: [820, 21],
      type: "line",
      itemStyle: {
        color: "#975fe4",
      },
      lineStyle: {
        type: "solid",
      },

      smooth: true,
      areaStyle: {
        color: "#975fe4",
      },
    },
  ],
};

const echartStyle = {
  height: 100,
};
export default function Vistor() {
  const [tableCol, setCol] = useState([]);
  const [tableData, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getList({ page, pagesize });
    // eslint-disable-next-line
  }, []);
  const getList = (data) => {
    getVistor(data).then((res) => {
      const { status, data } = res;
      if (status === 0 && data) {
        let list = data.list || [];
        list = data.list.map((i, index) => ({
          ...i,
          key: i.time + i.url + index,
        }));
        setData(list);
        setCol(data.mapKey);
        setTotal(data.total);
      }
    });
  };
  const getTableTitle = () => {
    return (
      <Row justify="space-between" align="center" gutter={80}>
        <Col style={{ lineHeight: "32px" }}>访问统计</Col>
      </Row>
    );
  };

  // 页码改版
  const pageChange = (page, pagesize) => {
    setPage(page);
    setPagesize(pagesize);
    getList({ page, pagesize });
  };
  return (
    <div className="vistor-container">
      <Row gutter={[20, 20]}>
        <Col span={6}>
          <Card className="cards">
            <p className="title">访问量</p>
            <p className="num">123132</p>
            <div className="echart">
              <Echarts option={option} style={echartStyle} />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="cards">
            <p className="title">处理次数</p>
            <p className="num">123132</p>
            <div className="echart">
              <Echarts option={option} style={echartStyle} />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="cards">
            <p className="title">访问量</p>
            <p className="num">123132</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="cards">
            <p className="title">访问量</p>
            <p className="num">123132</p>
          </Card>
        </Col>
      </Row>
      <Table
        className="table"
        title={getTableTitle}
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
    </div>
  );
}
