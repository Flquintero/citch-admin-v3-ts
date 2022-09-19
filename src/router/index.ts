import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { getAuth, Auth } from 'firebase/auth';
import { app } from '@/config/firebase';
import Repository from '@/api-repository/index';
const AuthRepository = Repository.get('auth');

const AUTH_INSTANCE: Auth = getAuth(app);

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // AUTH REQUIRED
  {
    path: '/',
    name: 'admin',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/Admin.vue'),
    children: [
      {
        path: '/settings',
        name: 'settings',
        meta: { requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "settings" */ '../views/admin/settings/Settings.vue'),
        children: [
          {
            path: 'user',
            component: () =>
              import(/* webpackChunkName: "user" */ '../views/admin/settings/user/Profile.vue'),
          },
        ],
      },
    ],
  },
  // NO AUTH REQUIRED
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
  const currentUser = await AuthRepository.observerCurrentAuthedUser();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    return next('/login');
  } else {
    next();
  }
});

export default router;
