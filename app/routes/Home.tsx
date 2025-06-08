import App from '~/components/app';
import type { Route } from '../+types/root';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'YATA' },
    { name: 'description', content: 'Welcome to Yet Another Todo App!' },
  ];
}

export default function Home() {
  return <App />;
}
