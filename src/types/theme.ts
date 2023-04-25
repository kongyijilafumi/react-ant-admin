import { GlobalToken } from "antd/es/theme/interface";
export type ThemeMode = 'default' | 'dark'
export type StateThemeReducerType = 'set'
export interface StateTheme {
  token: ThemeToken
}

interface CustomThemeToken {
  'test-color': string
  [key: string]: string | undefined
}

export type ThemeToken = GlobalToken & CustomThemeToken