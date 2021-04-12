import React from "react";
import { Row, Col } from "antd";
import Dnd from "@/components/dnd";
import FreeDnd from "@/components/dnd/free";
import "./index.scss";
const getItems = (length) =>
  Array.from({ length }, (v, k) => ({
    key: getRandom(k + 50000000) + "" + getRandom(k + 50000000),
    id: getRandom(k + 50000000) + "",
    component: "div",
    className: "dnd-items",
    children: k + 1,
  }));
const getRandom = (num) => Math.ceil(Math.random() * num);
const verticalItems = getItems(4);
const horizontalItems = Array.from({ length: 4 }, (v, k) => ({
  key: getRandom(k + 200) + "" + getRandom(k + 200),
  component: Col,
  className: "dnd-items horizontal",
  span: 4,
  children: k + 1,
}));
const change = (tags) => {
  console.log(tags);
};
const renderItem = ({ tag, index }) => {
  return <Col className="dnd-items free">{tag.children}</Col>;
};
export default function Drag() {
  return (
    <div className="drag-container">
      <h2>拖拽组件</h2>
      <div className="title">垂直拖拽</div>
      <Dnd direction="vertical" body={"div"} items={verticalItems} />
      <div className="title">水平拖拽</div>
      <Dnd direction="horizontal" body={Row} items={horizontalItems} />
      <div className="title">自由拖拽</div>
      <FreeDnd data={getItems(12)} onChange={change} renderItem={renderItem} />
    </div>
  );
}
