import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import "./index.less"

function onContextMenu(e) {
  e.stopPropagation()
  e.preventDefault()
  return false
}
export default function ContextMenu({ isCurrent, visible, x, y, setVisible, onClose }) {
  const ref = useRef()
  const [style, setStyle] = useState({})

  const display = useMemo(() => {
    if (visible) {
      return "block"
    }
    return "none"
  }, [visible])

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
    const width = ref.current.offsetWidth
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
  const closeAll = useCallback((e) => {
    e.stopPropagation()
    console.log("关闭全部");
    onClose("all")
    closeMenu()
  }, [closeMenu, onClose])

  // 关闭右侧 选项
  const closeRight = useCallback((e) => {
    e.stopPropagation()
    console.log("右");
    onClose("right")
    closeMenu()
  }, [closeMenu, onClose])

  // 关闭左侧 选项
  const closeLeft = useCallback((e) => {
    e.stopPropagation()
    console.log("左");
    onClose("left")
    closeMenu()
  }, [closeMenu, onClose])

  // 关闭当前选项
  const closeCurrent = useCallback((e) => {
    e.stopPropagation()
    console.log("当前");
    onClose("current")
    closeMenu()
  }, [closeMenu, onClose])

  return <div
    onContextMenu={onContextMenu}
    onMouseUp={closeMenu}
    style={{ display }}
    className="centext-menu"
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