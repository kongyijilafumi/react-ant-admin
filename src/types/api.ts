import { UserInfo } from "./user"
import { MenuItem, MenuList } from "./menu"
export type MessageList = MessageItem[]
type MessageItem = {
  add_time: string
  creator: string
  description: string
  m_id: number
  name: string
}
export type MapKey = {
  dataIndex: string
  key: string
  title: string
  width?: number
  [keyname: string]: any
}[]
export interface ResponseData {
  status: number
  msg?: string
}
export interface MessageAPi extends ResponseData {
  data?: {
    total: number
    mapKey: MapKey
    list: MessageList
  }
}

export interface LoginApi extends ResponseData {
  data: UserInfo
  token: string
}
export type PowerList = {
  type_id: number
  name: string
  menu_id: string
}[]

export interface PowerApi extends ResponseData {
  data: PowerList
  mapKey: MapKey
  menu: MenuList
}

export interface MenuInfoApi extends ResponseData {
  data: MenuItem | null
}

export type ResponseUserInfo = {
  account: string
  pswd: string
  type: string
  user_id: number
  username: string
}
export interface UserListApi extends ResponseData {
  data: {
    list: ResponseUserInfo[]
    mapKey: MapKey
  }
  total: number
}

type TimeInfo = {
  time: string
  value: number
}
export interface VisitorApi extends ResponseData {
  data: {
    deal: TimeInfo[]
    ips: TimeInfo[]
    today: {
      deal: number
      ips: number
    }
  }
}

export type VisitData = {
  ip: string
  s_id: number
  status: string
  time: string
  url: string
}

export interface VisitorListApi extends ResponseData {
  data: {
    mapKey: MapKey
    list: VisitData[]
    total: number
  }
}