import { State } from "@/types"

export { default as SingleColumn } from "./singleColumn";
export { default as TowColumn } from "./twoColumn";
export { default as TwoFlanks } from "./twoFlanks";
export { default as FullScreen } from "./fullScreen"
export interface LayoutModeProps {
  visible: State["componentsVisible"]
}