import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout("components/RequireAuth.tsx", [route("/", "routes/Inbox.tsx")]),
  route("about", "routes/About.tsx"),
  route("login", "routes/Login.tsx"),
  route("auth/callback", "routes/AuthCallback.tsx"),
] satisfies RouteConfig;
