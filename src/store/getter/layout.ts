import { State } from "@/types";

export const getStateLayout = (state: State) => state.layout[state.layout.length - 1]