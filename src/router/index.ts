import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'home',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/login/Login.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/auth/signup/Signup.vue'),
  },
  {
    path: '/confirm-password',
    name: 'confirm password',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "confirm-password" */ '../views/auth/reset-password/PasswordConfirm.vue'
      ),
  },
  {
    path: '/reset-password',
    name: 'reset password',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "reset-password" */ '../views/auth/reset-password/PasswordReset.vue'
      ),
  },
  {
    path: '/auth-redirect',
    name: 'auth redirect',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "auth-redirect" */ '../views/auth/redirect/AuthRedirect.vue'),
  },
  {
    path: '*',
    redirect: '/login',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  let isAuthed = store.getters['Users/isCurrentUserLoggedIn'];
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (isAuthed) return next();
    return next('/login');
  }
  next();
});

export default router;
