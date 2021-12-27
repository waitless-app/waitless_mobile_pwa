import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/pages/Home.vue';
import Register from '../components/pages/Register.vue';
import Login from '../components/pages/Login.vue';
import { getItem } from '../utils/localstorage';
import Premises from '../components/pages/Premises.vue';
import Menu from '../components/pages/Menu.vue';
import Order from '../components/pages/Order.vue';
import OrderList from '../components/pages/OrderList.vue';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    meta: { showNav: true },
  },
  {
    path: '/premises',
    component: Premises,
    name: 'Premises',
    meta: { showNav: true },
  },
  {
    path: '/order',
    component: OrderList,
    name: 'Order',
    meta: { showNav: true },
    children: [{
      path: '', component: Order,
    }],
  },
  {
    path: '/menu/:premisesId',
    component: Menu,
    name: 'Menu',
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
