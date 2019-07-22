import { RouteConfig } from 'vue-router';
const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Main.vue') },
      { path: 'all', component: () => import('pages/Main.vue') },
      { path: 'archieved', component: () => import('pages/Main.vue') },
      { path: 'setting', component: () => import('pages/Setting.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
