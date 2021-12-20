import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/pages/Home.vue';
import Register from '../components/pages/Register.vue';
import Login from '../components/pages/Login.vue';
import { getItem } from '../utils/localstorage';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    meta: { showNav: true },
  },
  {
    path: '/register',
    component: Register,
    name: 'Register',
    meta: { showNav: false },
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
    meta: { showNav: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!['Login', 'Register'].includes(to.name) && !getItem('access_token')) next({ name: 'Login' });
  else next();
});

export default router;
