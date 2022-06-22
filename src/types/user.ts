// 用户信息
export type UserInfo = {
  account: string
  type: string
  user_id: number
  username: string
  isLogin?: boolean
} | null

export type UserAction = {
  type: string
  info?: UserInfo
}

export type UserState = {
  user: UserInfo
}