import { LayoutMode, LayoutModeType } from "@/types"

export const changeLayoutMode = (type: LayoutModeType, mode?: LayoutMode) => ({
  type,
  mode,
});
