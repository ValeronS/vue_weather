import HomePage from '@/pages/HomePage';
import { createRouter, createWebHashHistory } from 'vue-router';
import FavoritePage from '@/pages/FavoritePage';
import SearchPage from '@/pages/SearchPage';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/favorite',
    component: FavoritePage,
  },
  {
    path: '/search',
    component: SearchPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL),
});

export default router;
