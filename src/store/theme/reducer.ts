import { StateTheme, StateThemeReducerType } from "@/types";
import { theme } from 'antd';

const defaultToken = { ...theme.defaultAlgorithm(theme.defaultSeed), ...CUSTOMVARLESSDATA } as unknown as StateTheme['token']

export default function reducer(state: StateTheme = { token: defaultToken }, action: { type: StateThemeReducerType, token: StateTheme['token'] }) {
  const { token, type } = action;
  switch (type) {
    case 'set':
      return { ...state, token }
    default:
      return state
  }
}
