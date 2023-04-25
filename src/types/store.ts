import { UserInfo } from "./user"
import { MenuState } from "./menu"
import { LayoutMode } from "./layout"
import { StateTheme } from "./theme"


export interface componentsVisible {
  footer: boolean
  topMenu: boolean
}

export default interface State {
  menu: MenuState
  user: UserInfo
  layout: LayoutMode[]
  componentsVisible: componentsVisible
  theme: StateTheme
}