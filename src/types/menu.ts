import { MapKey } from "./api"

// 关于菜单State的action
export type MenuAction = {
  type: string
  keys: string[]
  menuItem: OpenedMenu
  list: MenuItem[],
  path: string
}

// 
export interface OpenedMenu {
  key: string
  path: string
  title: string
}

export interface MenuState {
  openedMenu: OpenedMenu[]
  openMenuKey: string[]
  selectMenuKey: string[]
  menuList: MenuItem[],
  currentPath: string
}

// 未处理的菜单列表信息
export interface MenuItem {
  menu_id: number
  [MENU_ICON]: string
  [MENU_KEEPALIVE]: string
  [MENU_KEY]: string | number
  order?: number
  [MENU_PARENTKEY]: string
  [MENU_PATH]: string
  [MENU_TITLE]: string
  [MENU_CHILDREN]?: MenuList
  [MENU_PARENTPATH]?: string
  [MENU_SHOW]?: boolean | string
  [key: string]: any
}

export type MenuMap = {
  [key: string]: {
    [MENU_CHILDREN]: Array<MenuItem>
  } | MenuItem
} | {
  [key: string]: MenuItem
}

export type MenuList = MenuItem[]


export type MenuResponse = MenuList

export type MenuListResponse = {
  data: MenuList,
  mapKey: MapKey
}
