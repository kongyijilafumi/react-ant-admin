import { getCompVisibel } from "@/utils";

const visible = getCompVisibel() || { footer: true, topMenu: true };

export default function reducer(state = visible, action) {
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
