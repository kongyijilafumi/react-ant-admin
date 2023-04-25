import React, { useEffect, useState, useCallback, useMemo } from "react";
import MyIcon from "@/components/icon";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Link, useNavigate } from "react-router-dom";
import useStyle from "./style"
import { OpenedMenu } from "@/types"
import { message } from "antd";
import ContextMenu, { CloseType } from "../contextMenu";
import { useDispatchMenu, useStateCurrentPath, useStateOpenedMenu } from "@/store/hooks";
import { useThemeToken } from "@/hooks";
// 重新记录数组顺序
const reorder = (list: OpenedMenu[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  //删除并记录 删除元素1
  const [removed] = result.splice(startIndex, 1);
  //将原来的元素添加进数组
  result.splice(endIndex, 0, removed);
  return result;
};

function MenuDnd() {
  const [data, setData] = useState<OpenedMenu[]>([]);
  const [contextMenuVisible, setVisible] = useState(false)
  const [currentItem, setCurrentItem] = useState<OpenedMenu | null>(null)
  const [point, setPoint] = useState({ x: 0, y: 0 })
  const navigate = useNavigate()
  const openedMenu = useStateOpenedMenu()
  const currentPath = useStateCurrentPath()
  const { stateFilterOpenMenuKey: filterOpenMenu } = useDispatchMenu()
  const token = useThemeToken()
  const { styles } = useStyle(token)
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
  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) {
      return;
    }
    //获取拖拽后的数据 重新赋值
    const newData = reorder(data, result.source.index, result.destination.index);
    setData(newData);
  }, [data]);

  // 关闭当前顶部菜单
  const closeCurrent = useCallback((item: OpenedMenu) => {
    const newData = data.filter((i) => i.path !== item.path);
    const next = newData[newData.length - 1];
    if (next) {
      setData(newData);
    }
    const isCurrent = item.path === currentPath
    filterOpenMenu([item.path])
    if (next && isCurrent) {
      navigate(next.path, { replace: true });
    } else if (isCurrent && !next) {
      navigate("/", { replace: true })
    }
  }, [data, currentPath, filterOpenMenu, navigate]);

  // 关闭右侧
  const closeRight = useCallback(() => {
    if (!currentItem) {
      return
    }
    const findIndex = data.findIndex(item => item.path === currentItem.path)
    console.log(findIndex);
    // 如果在最后一个选择关闭右侧
    if (findIndex === data.length - 1) {
      return message.warning("右侧无关闭项")
    }
    const keys = data.slice(findIndex + 1).map(i => i.path)
    console.log(keys);
    filterOpenMenu(keys)
    navigate(currentItem.path, { replace: true })

  }, [currentItem, data, filterOpenMenu, navigate])

  // 关闭左侧
  const closeLeft = useCallback(() => {
    if (!currentItem) {
      return
    }
    const findIndex = data.findIndex(item => item.path === currentItem.path)
    console.log(findIndex);
    // 如果在最后一个选择关闭左侧
    if (findIndex === 0) {
      return message.warning("左侧无关闭项")
    }
    const keys = data.slice(0, findIndex).map(i => i.path)
    console.log(keys);
    filterOpenMenu(keys)
    navigate(currentItem.path, { replace: true })
  }, [currentItem, data, filterOpenMenu, navigate])

  // 关闭左侧
  const closeAll = useCallback(() => {
    const keys = data.map(i => i.path)
    console.log(keys);
    filterOpenMenu(keys)
    navigate("/", { replace: true })
  }, [data, filterOpenMenu, navigate])

  // 右键打开弹窗菜单
  const onContextMenu = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>, item: OpenedMenu) => {
    const { clientX: x, clientY: y } = e
    e.stopPropagation()
    e.preventDefault()
    setVisible(true)
    setCurrentItem(item)
    setPoint({ x, y })
    return false
  }, [])

  // 右键选择关闭
  const onContextMenuClose = useCallback((type: CloseType) => {
    switch (type) {
      case "current":
        closeCurrent(currentItem as OpenedMenu)
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
        const clsname = currentPath === item.path ? "active " : ""
        const iconClick: React.MouseEventHandler<HTMLSpanElement> = (e) => {
          e.preventDefault();
          e.stopPropagation();
          closeCurrent(item);
        }
        return <Draggable index={index} key={item.path} draggableId={item.path}>
          {(provided) => (
            //在这里写你的拖拽组件的样式 dom 等等...
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onContextMenu={(e) => onContextMenu(e, item)}
              style={{ ...provided.draggableProps.style, display: "inline-block" }}>
              <Link
                className={clsname + styles.dndItem}
                to={item.path}
              >
                {item.title}
                <MyIcon
                  className="anticon-close"
                  type="icon_close"
                  onClick={iconClick}
                />
              </Link>
            </div>
          )}
        </Draggable>
      })
    }
    return null
  }, [data, currentPath, styles, onContextMenu, closeCurrent])

  return (<>
    <DragDropContext onDragEnd={onDragEnd}>
      {/* direction代表拖拽方向  默认垂直方向  水平方向:horizontal */}
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          //这里是拖拽容器 在这里设置容器的宽高等等...
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={"hide-scrollbar " + styles.dndDody}
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
      isCurrent={Boolean(currentItem && currentItem.path === currentPath)}
      onClose={onContextMenuClose}
      visible={contextMenuVisible}
      setVisible={setVisible}
    />
  </>);
}

export default MenuDnd
