import React from "react";
import { Row, Col } from "antd";
import Dnd from "@/components/dnd";
const getRandom = (num) => Math.ceil(Math.random() * num);
const bodyStyle = { height: 50, lineHeight: "50px" };
const verticalItems = Array.from({ length: 4 }, (v, k) => {
  return {
    key: getRandom(k + 200) + "",
    component: Row,
    style: {
      marginBottom: 20,
      background: "#e9e9e9",
      textAlign: "center",
    },
    children: k + 1,
  };
});
export default function Drag() {
  return (
    <div>
      <h2>拖拽组件</h2>
      <Dnd
        direction="vertical"
        body={"div"}
        bodyStyle={bodyStyle}
        items={verticalItems}
      />
    </div>
  );
}
