import Vue from 'vue';
import VueRouter from 'vue-router';
import vHome from '../views/Home.vue';
import vVampire from '../views/Vampire.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: vHome,
  },
  {
    path: '/vampire',
    name: 'Vampire',
    component: vVampire,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
