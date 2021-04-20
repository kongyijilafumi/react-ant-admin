import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// 重新记录数组顺序
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  //删除并记录 删除元素
  const [removed] = result.splice(startIndex, 1);
  //将原来的元素添加进数组
  result.splice(endIndex, 0, removed);
  return result;
};

function Dnd({ body: Body, items, bodyProps, direction = "vertical" }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (items && items.length !== 0) {
      //初始化数据
      setData(items);
    }
    // eslint-disable-next-line
  }, []);

  //拖拽结束
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    //获取拖拽后的数据 重新赋值
    const newData = reorder(
      data,
      result.source.index,
      result.destination.index
    );
    setData(newData);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* direction代表拖拽方向  默认垂直方向  垂直方向 vertical 水平方向:horizontal */}
      <Droppable droppableId="droppable" direction={direction}>
        {(provided, snapshot) => (
          //这里是拖拽容器 在这里设置容器的宽高等等...
          <Body
            {...provided.droppableProps}
            {...bodyProps}
            ref={provided.innerRef}
          >
            {/* 这里放置所需要拖拽的组件,必须要被 Draggable 包裹 */}
            {data.map((item, index) => {
              const { component: Components, key, style, ...props } = item;
              return (
                <Draggable index={index} key={key} draggableId={key}>
                  {(provided, snapshot) => (
                    //在这里写你的拖拽组件的样式 dom 等等...
                    <Components
                      {...props}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ ...style, ...provided.draggableProps.style }}
                    />
                  )}
                </Draggable>
              );
            })}
            {/* 这个不能少 */}
            {provided.placeholder}
          </Body>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default Dnd;
