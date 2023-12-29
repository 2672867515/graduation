import { lazy } from 'react';

const Page1 = lazy(() => import('./pages/page1/index.tsx')); 
const Page2 = lazy(() => import('./pages/page2/index.tsx'));

const routes = [
  { name: '首页', component: Page1, path: '/Page1' },
  { name: '虚拟', component: Page2, path: '/Page2' },
];

export default routes;
