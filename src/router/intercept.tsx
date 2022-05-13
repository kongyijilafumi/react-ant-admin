import { useCallback, useEffect } from "react";
import { addOpenedMenu, setCurrentPath, setOpenKey, setSelectKey } from "@/store/menu/action";
import { connect } from "react-redux";
import { getMenuParentKey } from "@/utils";
import Error from "@/pages/err";
import { OpenedMenu, State, Dispatch, MenuList } from "@/types";
import { useLocation } from "react-router-dom";

const mapStateToProps = (state: State) => ({
  openMenus: state.menu.openedMenu,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addOpenedMenuFn: (val: OpenedMenu) => dispatch(addOpenedMenu(val)),
  setSelectedKeys: (val: string[]) => dispatch(setSelectKey(val)),
  setOpenKeys: (val: string[]) => dispatch(setOpenKey(val)),
  setPath: (path: string) => dispatch(setCurrentPath(path))
});


interface Props {
  [MENU_PATH]: string
  [MENU_TITLE]: string
  pageKey: string
  openMenus: State["menu"]["openedMenu"]
  setOpenKeys: (val: string[]) => void
  setSelectedKeys: (val: string[]) => void
  addOpenedMenuFn: (val: OpenedMenu) => void
  type: string
  components: JSX.Element
  userInfo: State["user"]
  menuList: MenuList
  setPath: (p: string) => void
  [key: string]: any
}

function Intercepts(props: Props) {
  const { [MENU_TITLE]: title, openMenus, pageKey, menuList, [MENU_PATH]: path, setPath, setSelectedKeys, setOpenKeys, addOpenedMenuFn, components } = props
  const location = useLocation()

  const addTopMenu = useCallback((info: OpenedMenu | undefined, key: string, path: string, title: string) => {
    if (!info) {
      addOpenedMenuFn({
        key,
        path,
        title,
      });
    }
  }, [addOpenedMenuFn])

  const init = useCallback(() => {
    if (!title) {
      return 
    }
    document.title = title;
    const pagePath = location.pathname + (location.hash || location.search);
    const findInfo = openMenus.find((i) => i.path === pagePath);
    setPath(pagePath)
    setSelectedKeys([String(pageKey)]);
    let openkey = getMenuParentKey(menuList, pageKey);
    setOpenKeys(openkey);

    addTopMenu(findInfo, pageKey, pagePath, title)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location, menuList, pageKey, openMenus, title, addTopMenu])

  useEffect(() => {
    init()
  }, [init])
  const hasPath = !menuList.find((m) => (m[MENU_PARENTPATH] || "") + m[MENU_PATH] === path);

  if (hasPath && path !== "/" && path !== "*") {
    return (
      <Error
        status="403"
        errTitle="权限不够"
        subTitle="Sorry, you are not authorized to access this page."
      />
    );
  }
  return components;

}


export default connect(mapStateToProps, mapDispatchToProps)(Intercepts);
