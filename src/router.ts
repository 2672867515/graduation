import { lazy } from 'react';

const Page1 = lazy(() => import('./pages/page1/index.tsx')); 
const Page2 = lazy(() => import('./pages/page2/index.tsx'));
const Login = lazy(() => import('./pages/login/index.tsx'));
const Personal = lazy(() => import('./pages/personal/index.tsx'));

const routes = [
  { name: '首页', component: Page1, path: '/Page1' },
  { name: '详情', component: Page2, path: '/Page2' },
  { name: '登录', component: Login, path: '/Login' },
  { name: '个人中心', component: Personal, path: '/Personal' },
];

export default routes;
