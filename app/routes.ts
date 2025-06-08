import { type RouteConfig, layout, route } from '@react-router/dev/routes';

export default [
  layout('components/RequireAuth.tsx', [route('/', 'routes/home.tsx')]),
  route('about', 'routes/about.tsx'),
  route('login', 'routes/login.tsx'),
  route('auth/callback', 'routes/authcallback.tsx'),
] satisfies RouteConfig;
