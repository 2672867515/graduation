import { lazy } from 'react';

const home = lazy(() => import('./pages/home/index.tsx')); 
const Detail = lazy(() => import('./pages/detail/index.tsx'));
const Login = lazy(() => import('./pages/login/index.tsx'));
const Personal = lazy(() => import('./pages/personal/index.tsx'));

const routes = [
  { name: '首页', component: home, path: '/Home' },
  { name: '详情', component: Detail, path: '/detail/:id' },
  { name: '登录', component: Login, path: '/Login' },
  { name: '个人中心', component: Personal, path: '/Personal' },
];

export default routes;
