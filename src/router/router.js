import HomePage from '@/pages/HomePage';
import { createRouter, createWebHashHistory } from 'vue-router';
import LocationPage from '@/pages/LocationPage';
import SearchPage from '@/pages/SearchPage';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/location',
    component: LocationPage,
  },
  {
    path: '/location/search',
    component: SearchPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL),
});

export default router;
