import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('components/RequireAuth.tsx', [
    route('app', 'routes/home.tsx'),
    route('/', 'routes/about.tsx'),
  ]),
  route('login', 'routes/login.tsx'),
  route('register', 'routes/register.tsx'),
] satisfies RouteConfig;
