import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL),
});

export default router;
