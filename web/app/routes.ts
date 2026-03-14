import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/characters/characters.tsx"),
    route("inventory/:cid", "routes/inventory/inventory.tsx"),
] satisfies RouteConfig;
