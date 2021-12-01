import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/core/Home.vue';

const routes = [{ path: '/', component: Home }];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
