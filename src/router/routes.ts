import { Route, RouteConfig } from 'vue-router';
import store from '../store';

const requireAuth = (to: Route, from: Route, next: (to?: any) => void) => {
  let token: string = store().getters.getToken;
  if (token === '') {
    store().commit('setTokenFromCookie');
    token = store().getters.getToken;
  }

  if (token === '') {
    return next('/login');
  } else {
    return next();
  }
};
const checkAlreadyAuth = (to: Route, from: Route, next: (to?: any) => void) => {
  store().commit('setTokenFromCookie');
  const token = store().getters.getToken;

  if (token === '') {
    return next();
  } else {
    return next('/');
  }
};

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
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue'),
    beforeEnter: checkAlreadyAuth,
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
