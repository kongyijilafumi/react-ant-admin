import React, { useEffect, useState, useCallback } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./index.less";
// 重新记录数组顺序
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  //删除并记录 删除元素1
  const [removed] = result.splice(startIndex, 1);
  //将原来的元素添加进数组
  result.splice(endIndex, 0, removed);
  return result;
};

export default function Dnd({ rangeVal, currentKey, onClose, onChoose }) {
  const [data, setData] = useState([]);

  // 根据 选中的菜单 往里添加拖拽选项
  useEffect(() => {
    let old = [...data];
    rangeVal.forEach((item) => {
      if (!data.find((i) => i.key === item.key)) {
        old.push(item);
      }
    });
    setData(old);
    // eslint-disable-next-line
  }, [rangeVal]);

  //拖拽结束
  const onDragEnd = useCallback(
    (result) => {
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
    },
    [data]
  );

  // 关闭当前顶部菜单
  const closeCurrent = useCallback(
    (key) => {
      const newData = data.filter((i) => i.key !== key);
      setData(newData);
      onClose(key, newData[newData.length - 1], key === currentKey);
    },
    [data, currentKey, onClose]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* direction代表拖拽方向  默认垂直方向  水平方向:horizontal */}
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          //这里是拖拽容器 在这里设置容器的宽高等等...
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="dnd-body hide-scrollbar"
          >
            {/* 这里放置所需要拖拽的组件,必须要被 Draggable 包裹 */}
            {data.map((item, index) => (
              <Draggable index={index} key={item.key} draggableId={item.key}>
                {(provided, snapshot) => (
                  //在这里写你的拖拽组件的样式 dom 等等...
                  <div
                    className={
                      currentKey === item.key ? "dnd-items active" : "dnd-items"
                    }
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style }}
                    onClick={() => onChoose(item)}
                  >
                    {item.title}
                    <CloseOutlined
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        closeCurrent(item.key);
                      }}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {/* 这个不能少 */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
