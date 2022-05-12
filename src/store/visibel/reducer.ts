import { getCompVisibel } from "@/utils";
import { State } from "@/types"
const visible = getCompVisibel() || { footer: true, topMenu: true };

export default function reducer(state = visible, action: {
  type: string
  key: keyof State["componentsVisible"]
  val: boolean
}) {
  const { type, key, val } = action;
  switch (type) {
    case "set": {
      return { ...state, [key]: val };
    }
    default: {
      return state;
    }
  }
}
