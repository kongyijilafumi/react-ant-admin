import { StateTheme } from "@/types"
export const setThemeToken = (token: StateTheme['token']) => ({
  token, type: 'set'
});
