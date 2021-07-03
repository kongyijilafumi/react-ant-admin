import { useEffect, useState } from "react";
import {
  Table,
  Row,
  Spin,
  Drawer,
  Slider,
  Radio,
  Tooltip,
} from "antd";
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import MyIcon from "../icon";
import "./index.less";

const DragHandle = sortableHandle(() => <MyIcon type="icon_mirrorlightctrl" className="drag-sort" />);
const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);

const setColTitle = [
  {
    title: '列排序',
    dataIndex: 'sort',
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: "列名",
    dataIndex: "title",
    className: 'drag-visible',
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
];

const defaultCol = {
  width: 80,
  fixed: false,
  ellipsis: false,
  align: "left",
};

function UseTable(columns) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [col, setCol] = useState([]); // 显示表格
  const [tbTitle, setTitle] = useState([]); // 设置表格

  const DraggableContainer = (props) => <SortableContainer
    useDragHandle
    disableAutoscroll
    helperClass="row-dragging"
    onSortEnd={onSortEnd}
    {...props}
  />
  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const index = col.findIndex(x => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };
  // 初始化表格设置
  useEffect(() => {
    if (columns && columns.length && col.length === 0) {
      const newCol = columns.map((c, index) => ({ ...defaultCol, ...c, index }));
      setCol(newCol);
    }
    // eslint-disable-next-line
  }, [columns]);

  // 表格设置渲染
  useEffect(() => {
    if (col.length) {
      const newTb = setColTitle.map((c) => {
        if (c.type === "switch") {
          c.render = (...args) => switchRender(c, ...args);
        }
        if (c.type === "slider") {
          c.render = (...args) => sliderRender(c.dataIndex, ...args);
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


  function hiddin() {
    setShowDrawer(false);
  }
  function show() {
    setShowDrawer(true);
  }

  function onSortEnd({ oldIndex, newIndex }) {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(col), oldIndex, newIndex).filter(el => !!el);
      setCol(newData)
    }
  }
  return { col, showDrawer, show, hiddin, tbTitle, DraggableContainer, DraggableBodyRow };
}

function MyTable({ columns, dataSource, loading = false, children, ...Props }) {
  const { showDrawer, show, hiddin, col, tbTitle, DraggableContainer, DraggableBodyRow } = UseTable(columns);

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
        <Table
          columns={tbTitle}
          dataSource={col}
          rowKey="index"
          components={{
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow,
            }
          }}
          pagination={false} />
      </Drawer>
    </Spin>
  );
}
export default MyTable;
