import Vue from 'vue';
import VueRouter from 'vue-router';
import vHome from '../views/Home.vue';
import vMonster from '../views/Monster.vue';
import vAbout from '../views/About.vue';
import vNotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: vHome,
  },
  {
    path: '/:monster',
    name: 'Monster',
    component: vMonster,
    props: true,
  },
  {
    path: '/:monster/:contentType',
    name: 'Content',
  },
  {
    path: '/about',
    name: 'About',
    component: vAbout,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '*',
    component: vNotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
