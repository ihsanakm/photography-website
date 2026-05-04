import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/Home.tsx"), // I'll create Home.tsx which will be the old App.tsx logic
  route("portfolio", "pages/Portfolio.tsx"),
  route("*", "pages/NotFound.tsx"),
] satisfies RouteConfig;
