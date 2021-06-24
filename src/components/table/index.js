import { useEffect, useState } from "react";
import {
  Table,
  Row,
  Spin,
  Drawer,
  Slider,
  Radio,
  Tooltip,
  Button,
  message,
} from "antd";
import MyIcon from "../icon";
import "./index.less";

const setColTitle = [
  {
    title: "列名",
    dataIndex: "title",
    align: "center",
  },
  {
    title: "宽度",
    dataIndex: "width",
    width: 200,
    type: "slider",
  },
  {
    title: "固定",
    dataIndex: "fixed",
    width: 120,
    type: "switch",
    align: "center",
    range: [
      { v: false, t: "关" },
      { v: "left", t: "左固定" },
      { v: "right", t: "右固定" },
    ],
  },
  {
    title: "超出宽度隐藏",
    dataIndex: "ellipsis",
    type: "switch",
    align: "center",
    range: [
      { v: false, t: "否" },
      { v: true, t: "是" },
    ],
  },
  {
    title: "对齐",
    dataIndex: "align",
    type: "switch",
    align: "center",
    range: [
      { v: "left", t: "左" },
      { v: "center", t: "居中" },
      { v: "right", t: "右" },
    ],
  },
  {
    title: "位置调整",
    align: "center",
    dataIndex: "position",
  },
];

const defaultCol = {
  width: 80,
  fixed: false,
  ellipsis: false,
  align: "left",
};

function UseTable(columns) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [col, setCol] = useState([]);
  const [tbTitle, setTitle] = useState([]);
  useEffect(() => {
    if (columns && columns.length && col.length === 0) {
      const newCol = columns.map((c) => ({ ...defaultCol, ...c }));
      setCol(newCol);
    }
    // eslint-disable-next-line
  }, [columns]);

  useEffect(() => {
    if (col.length) {
      const newTb = setColTitle.map((c) => {
        if (c.type === "switch") {
          c.render = (...args) => switchRender(c, ...args);
        }
        if (c.type === "slider") {
          c.render = (...args) => sliderRender(c.dataIndex, ...args);
        }
        if (c.dataIndex === "position") {
          c.render = arrowRender;
        }
        return c;
      });
      setTitle(newTb);
    }
    // eslint-disable-next-line
  }, [col]);

  function switchRender(column, text, current) {
    return (
      <Radio.Group
        buttonStyle="solid"
        value={text}
        onChange={(e) =>
          switchChange(column.dataIndex, e.target.value, current)
        }
      >
        {column.range &&
          column.range.map((r) => (
            <Row className="mt10" key={r.t} justify="center">
              <Tooltip title={r.t} arrowPointAtCenter>
                <Radio value={r.v}>{r.t}</Radio>
              </Tooltip>
            </Row>
          ))}
      </Radio.Group>
    );
  }
  function switchChange(key, val, current) {
    const dataIndex = current.dataIndex;
    let newCol = col.map((item) => {
      if (item.dataIndex === dataIndex) {
        item[key] = val;
      }
      return item;
    });
    setCol(newCol);
  }

  function sliderRender(dataIndex, text, col) {
    return (
      <>
        <Slider
          min={0}
          max={800}
          onChange={(v) => sliderChange(dataIndex, v, col)}
          value={text === "auto" ? 0 : text}
        />
      </>
    );
  }
  function sliderChange(key, val, current) {
    const dataIndex = current.dataIndex;
    let newCol = col.map((item) => {
      if (item.dataIndex === dataIndex) {
        item[key] = val;
      }
      return item;
    });
    setCol(newCol);
  }

  function arrowRender(text, current) {
    return (
      <>
        <Row justify="center" className="mt10">
          <Tooltip title="上移">
            <Button type="primary" onClick={() => arrowChange(current, "up")}>
              <MyIcon type="icon_upward" />
            </Button>
          </Tooltip>
        </Row>
        <Row justify="center">
          <Tooltip title="下移">
            <Button type="primary" onClick={() => arrowChange(current, "down")}>
              <MyIcon type="icon_down" />
            </Button>
          </Tooltip>
        </Row>
      </>
    );
  }

  function arrowChange(current, direction) {
    const findIndex = col.findIndex((c) => c === current);
    if (
      (findIndex === 0 && direction === "up") ||
      (findIndex === col.length - 1 && direction === "down")
    ) {
      return message.error("当前列位置无法移动");
    }
    const start = direction === "up" ? findIndex - 1 : findIndex;
    const end = direction === "up" ? findIndex + 1 : findIndex + 2;
    const next = col[direction === "up" ? findIndex - 1 : findIndex + 1];
    const insert = direction === "up" ? [current, next] : [next, current];
    const newCol = [...col.slice(0, start), ...insert, ...col.slice(end)];
    setCol(newCol);
  }

  function hiddin() {
    setShowDrawer(false);
  }
  function show() {
    setShowDrawer(true);
  }
  return { col, showDrawer, show, hiddin, tbTitle };
}

function MyTable({ columns, dataSource, loading = false, children, ...Props }) {
  const { showDrawer, show, hiddin, col, tbTitle } = UseTable(columns);

  return (
    <Spin spinning={loading}>
      <Row className="set" justify="end">
        <MyIcon type="icon_set" onClick={show} />
      </Row>
      <Table columns={col} dataSource={dataSource} {...Props}>
        {children}
      </Table>
      <Drawer
        className="table-drawer"
        width={1000}
        onClose={hiddin}
        maskClosable={true}
        visible={showDrawer}
        title="表格显示设置"
      >
        <Table columns={tbTitle} dataSource={col} pagination={false} />
      </Drawer>
    </Spin>
  );
}
export default MyTable;
