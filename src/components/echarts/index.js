import loadable from "@loadable/component";
const Line = loadable(() => import("./line"));
const Bar = loadable(() => import("./bar"));
const Pie = loadable(() => import("./pie"));

export { Line, Bar, Pie };
