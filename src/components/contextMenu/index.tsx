import { useThemeToken } from "@/hooks"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import useStyle from "./style"
export type CloseType = "all" | "right" | "left" | "current"

interface ContextMenuProps {
  isCurrent: boolean
  visible: boolean
  x: number
  y: number
  setVisible: (v: boolean) => void
  onClose: (t: CloseType) => void
}

const onContextMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
  e.stopPropagation()
  e.preventDefault()
}


export default function ContextMenu({ isCurrent, visible, x, y, setVisible, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLUListElement>(null)
  const [style, setStyle] = useState({})
  const token = useThemeToken()
  const { styles } = useStyle({ visible, token })
  const visibility = useMemo(() => {
    if (visible) {
      document.body.style.overflow = "hidden"
      return "visible"
    }
    document.body.style.overflow = "unset"
    return "hidden"
  }, [visible])

  useEffect(() => {
    const wwidth = window.screen.availWidth || document.body.offsetWidth
    const width = ref.current?.offsetWidth || 0
    let left = x, top = y;
    if (x + width > wwidth) {
      left = x - width
    }
    const newStyle = { left, top, visibility }
    setStyle(newStyle)
  }, [x, y, visibility, ref])
  // 关闭 菜单
  const closeMenu = useCallback(() => {
    if (visibility === "visible") {
      console.log("关闭弹窗");
      setVisible(false)
    }
    return false
  }, [setVisible, visibility])

  // 关闭所有选项
  const closeAll = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    console.log("关闭全部");
    onClose("all")
    closeMenu()
  }, [closeMenu, onClose])

  // 关闭右侧 选项
  const closeRight = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    console.log("右");
    onClose("right")
    closeMenu()
  }, [closeMenu, onClose])

  // 关闭左侧 选项
  const closeLeft = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    console.log("左");
    onClose("left")
    closeMenu()
  }, [closeMenu, onClose])

  // 关闭当前选项
  const closeCurrent = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    console.log("当前");
    onClose("current")
    closeMenu()
  }, [closeMenu, onClose])

  return <div
    onContextMenu={onContextMenu}
    onMouseUp={closeMenu}
    className={styles.centextMenu}
  >
    <ul style={style} ref={ref}>
      <li onMouseUp={closeAll}>关闭所有</li>
      <li onMouseUp={closeRight}>关闭右侧</li>
      <li onMouseUp={closeLeft}>关闭左侧</li>
      {
        isCurrent && <li onMouseUp={closeCurrent}>关闭当前</li>
      }
    </ul>
  </div>
}