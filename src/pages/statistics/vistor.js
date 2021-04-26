import React, { useEffect, useState } from "react";
import { Row, Col, Table, Pagination, Card } from "antd";
import { getVisitorList, getVisitorData } from "@/api";
import { Line as LineEchart } from "@/components/echarts";
import "./index.scss";

const pageSizeOptions = [10, 20, 50, 100];
const getOpt = () => ({
  xAxis: {
    type: "category",
    boundaryGap: false,
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
      name: "visitor",
      type: "line",
      itemStyle: {
        color: "#975fe4",
      },
      lineStyle: {
        type: "solid",
      },
      smooth: true,
      symbol: "none", //取消折点圆圈
      areaStyle: {
        color: "#975fe4",
      },
    },
  ],
});
const echartStyle = {
  height: 80,
};
export default function Vistor() {
  const [tableCol, setCol] = useState([]);
  const [tableData, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);
  const [total, setTotal] = useState(0);
  const [visitorOpt, setVisitor] = useState(getOpt());
  const [dealOpt, setDeal] = useState(getOpt());
  const [sumVisitor, setSumV] = useState(0);
  const [sumDeal, setSumD] = useState(0);

  useEffect(() => {
    getList({ page, pagesize });
    getVisitorData().then((res) => {
      const { status, data } = res;
      if (status === 0 && data) {
        const vOpt = { ...visitorOpt };
        const dOpt = { ...dealOpt };
        vOpt.xAxis.data = data.ips.map((i) => i.time);
        vOpt.series[0].data = data.ips.map((i) => i.value);
        dOpt.xAxis.data = data.deal.map((i) => i.time);
        dOpt.series[0].data = data.deal.map((i) => i.value);
        setDeal(dOpt);
        setVisitor(vOpt);
        setSumV(data.today.ips);
        setSumD(data.today.deal);
      }
    });
    // eslint-disable-next-line
  }, []);

  const getList = (data) => {
    getVisitorList(data).then((res) => {
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
            <p className="num">
              {(visitorOpt.series[0].data &&
                visitorOpt.series[0].data.reduce((a, c) => a + c, 0)) ||
                0}
            </p>
            <div className="echart">
              <LineEchart option={visitorOpt} style={echartStyle} />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="cards">
            <p className="title">处理次数</p>
            <p className="num">
              {(dealOpt.series[0].data &&
                dealOpt.series[0].data.reduce((a, c) => a + c, 0)) ||
                0}
            </p>
            <div className="echart">
              <LineEchart option={dealOpt} style={echartStyle} />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="cards">
            <p className="title">今日访问</p>
            <p className="num">{sumVisitor}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="cards">
            <p className="title">今日处理</p>
            <p className="num">{sumDeal}</p>
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
