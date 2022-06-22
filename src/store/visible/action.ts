import { State } from "@/types"
export const setVisible = (key: keyof State["componentsVisible"], val: boolean) => ({
  type: "set",
  key,
  val,
});
