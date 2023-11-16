import React, { useEffect, useState, useMemo } from "react";
import MyIcon from "@/components/icon";
import { useNavigate } from "react-router-dom";
import useStyle from "./style"
import { OpenedMenu } from "@/types"
import { message } from "antd";
import ContextMenu, { CloseType } from "../contextMenu";
import { useDispatchMenu, useStateCurrentPath, useStateOpenedMenu } from "@/store/hooks";
import { useThemeToken } from "@/hooks";
import { CSS, Transform } from '@dnd-kit/utilities';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {
  restrictToHorizontalAxis,
} from '@dnd-kit/modifiers';
import { createPortal } from "react-dom";

const dropAnimationConfig = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
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
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    }),
    useSensor(MouseSensor),
  );
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
  const onDragEnd = (result: DragEndEvent) => {
    const { active, over } = result;
    setActiveId(null);
    if (active && over && active.id !== over?.id) {
      setData((items) => {
        const oldIndex = items.findIndex((i) => i.key === active.id);
        const newIndex = items.findIndex((i) => i.key === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // 关闭当前顶部菜单
  const closeCurrent = (item: OpenedMenu) => {
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
  }

  // 关闭右侧
  const closeRight = () => {
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

  }

  // 关闭左侧
  const closeLeft = () => {
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
  }
  // 关闭左侧
  const closeAll = () => {
    const keys = data.map(i => i.path)
    console.log(keys);
    filterOpenMenu(keys)
    navigate("/", { replace: true })
  }

  // 右键打开弹窗菜单
  const onContextMenu = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>, item: OpenedMenu) => {
    const { clientX: x, clientY: y } = e
    e.stopPropagation()
    e.preventDefault()
    setVisible(true)
    setCurrentItem(item)
    setPoint({ x, y })
    return false
  }

  // 右键选择关闭
  const onContextMenuClose = (type: CloseType) => {
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
  }

  const sortItmes = useMemo(() => {
    return data.map(item => ({ id: item.key, ...item }))
  }, [data])

  const overlay = useMemo(() => {
    const item = openedMenu.find(item => item.key === activeId) as OpenedMenu
    return createPortal(
      <DragOverlay
        adjustScale={false}
        dropAnimation={dropAnimationConfig}
      >
        {activeId ? (
          <SortableItem
            key={activeId}
            id={activeId}
            toLink={navigate}
            onContextMenu={onContextMenu}
            clsName={currentPath === item.path ? "active " + styles.dndItem : styles.dndItem}
            onClick={closeCurrent} item={item}
          />
        ) : null}
      </DragOverlay>,
      document.body
    )
  }, [activeId])
  return (<>
    <DndContext
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }
        setActiveId(active.id);
      }}
      onDragEnd={onDragEnd}
      onDragCancel={() => setActiveId(null)}
      collisionDetection={closestCenter}
      sensors={sensors}
      modifiers={[restrictToHorizontalAxis]}
    >
      <SortableContext items={sortItmes} strategy={horizontalListSortingStrategy} >
        {sortItmes.map(item => (<SortableItem
          key={item.id}
          id={item.id}
          toLink={navigate}
          onContextMenu={onContextMenu}
          clsName={currentPath === item.path ? "active " + styles.dndItem : styles.dndItem}
          onClick={closeCurrent} item={item}
        />))}
      </SortableContext>
      {overlay}
    </DndContext >
    <ContextMenu
      {...point}
      isCurrent={Boolean(currentItem && currentItem.path === currentPath)}
      onClose={onContextMenuClose}
      visible={contextMenuVisible}
      setVisible={setVisible}
    />
  </>);
}


interface SortableItemProps {
  id: any
  onClick: (d: OpenedMenu) => void
  clsName: string
  item: OpenedMenu
  toLink: (path: string) => void
  onContextMenu: (e: any, d: OpenedMenu) => void
}
function SortableItem(props: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  let tm = transform ? { ...transform, scaleX: 1, scaleY: 1 } as Transform : transform
  const style = {
    transform: CSS.Transform.toString(tm),
    transition,
    display: "inline-block",
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} >
      <div
        className={props.clsName}
        {...listeners}
        onClick={() => {
          console.log(props.item.path);
          props.toLink(props.item.path)
        }}
        onContextMenu={(e) => props.onContextMenu(e, props.item)}
      >
        {props.item.title}
        <MyIcon
          className="anticon-close"
          type="icon_close"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            props.onClick(props.item)
          }}
        />
      </div>
    </div>
  );
}

export default MenuDnd