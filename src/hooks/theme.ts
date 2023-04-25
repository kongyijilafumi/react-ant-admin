import { ThemeToken } from "@/types"
import { theme } from "antd"
const { useToken } = theme

export function useThemeToken(): ThemeToken {
  return useToken().token as ThemeToken
}