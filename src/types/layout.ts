
export type LayoutMode = "TWO_COLUMN" | "SINGLECOLUMN" | "TWO_FLANKS" | "FULLSCREEN" | null
export type LayoutModeType = 'push' | 'pop'
export interface LayoutAction {
  type: LayoutModeType,
  mode: LayoutMode
}

export type LayoutModes = {
  img: string
  mode: LayoutMode
  alt: string
}[]