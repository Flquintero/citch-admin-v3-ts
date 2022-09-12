import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { getAuth, onAuthStateChanged, Auth, User } from 'firebase/auth';
import { app } from '@/config/firebase';
import store from '@/store';

const AUTH_INSTANCE: Auth = getAuth(app);

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'Home',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/login/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/auth/signup/Signup.vue'),
  },
  {
    path: '/confirm-password',
    name: 'Confirm password',
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
    name: 'Reset password',
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
    name: 'Auth redirect',
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
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    // TO DO: Not 100% convinced with this, feel like it needs to be tied to one source of truth with setting the user, but lets see how it goes
    if (!store.getters['modules/user/isCurrentUserLoggedIn']) {
      await onAuthStateChanged(AUTH_INSTANCE, (user: User | null): void => {
        if (user) return next();
        return next('/login');
      });
    } else {
      next();
    }
  }
  next();
});

export default router;
