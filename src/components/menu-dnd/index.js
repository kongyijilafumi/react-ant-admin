import React, { useEffect, useState, useCallback, useMemo } from "react";
import MyIcon from "@/components/icon";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { message } from "antd";
import { Link, useHistory } from "react-router-dom";
import ContextMenu from "../contextMenu";
import { useDispatchMenu, useStateCurrentPath, useStateOpenedMenu } from "@/store/hooks";
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

export default function MenuDnd() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [contextMenuVisible, setVisible] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [point, setPoint] = useState({ x: 0, y: 0 })
  // state
  const openedMenu = useStateOpenedMenu()
  const currentPath = useStateCurrentPath()
  const { stateFilterOpenMenuKey: filterOpenMenu } = useDispatchMenu()

  // 根据 选中的菜单 往里添加拖拽选项
  useEffect(() => {
    if (data.length !== openedMenu.length) {
      let old = [...data];
      openedMenu.forEach((item) => {
        if (!data.find((i) => i.path === item.path)) {
          old.push(item);
        }
      });
      old = old.filter((i) => openedMenu.find((item) => item.path === i.path));
      setData(old)
    }
  }, [openedMenu, data]);

  //拖拽结束
  const onDragEnd = useCallback((result) => {
    if (!result.destination) {
      return;
    }
    //获取拖拽后的数据 重新赋值
    const newData = reorder(data, result.source.index, result.destination.index);
    setData(newData);
  }, [data]);

  // 关闭当前顶部菜单
  const closeCurrent = useCallback((item) => {
    const newData = data.filter((i) => i.path !== item.path);
    const next = newData[newData.length - 1];
    if (next) {
      setData(newData);
    }
    const isCurrent = item.path === currentPath
    filterOpenMenu([item.path])
    if (next && isCurrent) {
      history.replace(next.path);
    } else if (isCurrent && !next) {
      history.replace("/")
    }
  }, [data, currentPath, filterOpenMenu, history]);

  // 关闭右侧
  const closeRight = useCallback(() => {
    if (!currentItem) {
      return
    }
    const findIndex = data.findIndex(item => item.path === currentItem.path)
    console.log(findIndex);
    // 如果在最后一个选择关闭右侧
    if (findIndex === data.length - 1) {
      return message.warn("右侧无关闭项")
    }
    const keys = data.slice(findIndex + 1).map(i => i.path)
    console.log(keys);
    filterOpenMenu(keys)
    history.replace(currentItem.path)

  }, [currentItem, data, filterOpenMenu, history])

  // 关闭左侧
  const closeLeft = useCallback(() => {
    if (!currentItem) {
      return
    }
    const findIndex = data.findIndex(item => item.path === currentItem.path)
    console.log(findIndex);
    // 如果在最后一个选择关闭左侧
    if (findIndex === 0) {
      return message.warn("左侧无关闭项")
    }
    const keys = data.slice(0, findIndex).map(i => i.path)
    console.log(keys);
    filterOpenMenu(keys)
    history.replace(currentItem.path)
  }, [currentItem, data, filterOpenMenu, history])

  // 关闭左侧
  const closeAll = useCallback(() => {
    const keys = data.map(i => i.path)
    console.log(keys);
    filterOpenMenu(keys)
    history.replace("/")
  }, [data, filterOpenMenu, history])

  // 右键打开弹窗菜单
  const onContextMenu = useCallback((e, item) => {
    const { clientX: x, clientY: y } = e
    e.stopPropagation()
    e.preventDefault()
    setVisible(true)
    setCurrentItem(item)
    setPoint({ x, y })
    return false
  }, [])

  // 右键选择关闭
  const onContextMenuClose = useCallback((type) => {
    switch (type) {
      case "current":
        closeCurrent(currentItem)
        break;
      case "right":
        closeRight()
        break
      case "left":
        closeLeft()
        break
      case "all":
        closeAll()
        break
      default:
        break;
    }
  }, [closeCurrent, currentItem, closeRight, closeLeft, closeAll])

  // 拖拽列表
  const DraggableList = useMemo(() => {
    if (data.length) {
      return data.map((item, index) => {
        const clsname = currentPath === item.path ? "dnd-items active" : "dnd-items"
        const iconClick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          closeCurrent(item);
        }
        return <Draggable index={index} key={item.path} draggableId={item.path}>
          {(provided) => (
            //在这里写你的拖拽组件的样式 dom 等等...
            <Link
              className={clsname}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onContextMenu={(e) => onContextMenu(e, item)}
              style={{ ...provided.draggableProps.style }}
              to={item.path}
            >
              {item.title}
              <MyIcon
                className="anticon-close"
                type="icon_close"
                onClick={iconClick}
              />
            </Link>
          )}
        </Draggable>
      })
    }
    return null
  }, [data, currentPath, onContextMenu, closeCurrent])

  return (<>
    <DragDropContext onDragEnd={onDragEnd}>
      {/* direction代表拖拽方向  默认垂直方向  水平方向:horizontal */}
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          //这里是拖拽容器 在这里设置容器的宽高等等...
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="dnd-body hide-scrollbar"
          >
            {/* 这里放置所需要拖拽的组件,必须要被 Draggable 包裹 */}
            {DraggableList}
            {/* 这个不能少 */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    <ContextMenu
      {...point}
      isCurrent={currentItem && currentItem.path === currentPath}
      onClose={onContextMenuClose}
      visible={contextMenuVisible}
      setVisible={setVisible}
    />
  </>);
}