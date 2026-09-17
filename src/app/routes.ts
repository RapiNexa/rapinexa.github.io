import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("./layouts/PublicLayout.tsx", [index("ui-public/routes/home.tsx")]),
] satisfies RouteConfig;
