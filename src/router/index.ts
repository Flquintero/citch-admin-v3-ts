import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Repository from "@/api-repository/index";
const AuthRepository = Repository.get("auth");

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // AUTH REQUIRED
  {
    path: "/",
    redirect: "/post-link",
    name: "admin",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/admin/AdminIndex.vue"),
    children: [
      {
        path: "/post-link",
        name: "post-link",
        meta: { requiresAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "postLink" */ "../views/admin/choose-post/PostLink.vue"
          ),
      },
      {
        path: "/builder/:platform",
        name: "builder",
        meta: { requiresAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "builderIndex" */ "../views/admin/builder/BuilderIndex.vue"
          ),
        children: [
          {
            path: "connect",
            name: "platform connect",
            component: () =>
              import(
                /* webpackChunkName: "platformConnect" */ "../views/admin/platform-connect/ConnectIndex.vue"
              ),
          },
          {
            path: "objective",
            name: "platform objective",
            component: () =>
              import(
                /* webpackChunkName: "platformObjective" */ "../views/admin/platform-objective/ObjectiveIndex.vue"
              ),
          },
          {
            path: "objective-goal",
            name: "platform objective goal",
            component: () =>
              import(
                /* webpackChunkName: "platformObjectiveGoal" */ "../views/admin/platform-objective-goal/ObjectiveGoalIndex.vue"
              ),
          },
          {
            path: "audience",
            name: "platform audience",
            component: () =>
              import(
                /* webpackChunkName: "platformAudience" */ "../views/admin/platform-audience/AudienceIndex.vue"
              ),
          },
          {
            path: "duration",
            name: "platform duration",
            component: () =>
              import(
                /* webpackChunkName: "platformDuration" */ "../views/admin/platform-duration/DurationIndex.vue"
              ),
          },
          {
            path: "budget",
            name: "platform budget",
            component: () =>
              import(
                /* webpackChunkName: "platformBudget" */ "../views/admin/platform-budget/BudgetIndex.vue"
              ),
          },
        ],
      },
      {
        path: "/settings",
        name: "settings",
        meta: { requiresAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/admin/settings/SettingsIndex.vue"
          ),
        children: [
          {
            path: "user",
            component: () =>
              import(
                /* webpackChunkName: "user" */ "../views/admin/settings/user/Profile.vue"
              ),
          },
        ],
      },
    ],
  },
  // NO AUTH REQUIRED
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "login" */ "../views/auth/login/AuthLogin.vue"
      ),
  },
  {
    path: "/signup",
    name: "signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "register" */ "../views/auth/signup/AuthSignup.vue"
      ),
  },
  {
    path: "/confirm-password",
    name: "confirm password",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "confirm-password" */ "../views/auth/reset-password/PasswordConfirm.vue"
      ),
  },
  {
    path: "/reset-password",
    name: "reset password",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "resetPassword" */ "../views/auth/reset-password/PasswordReset.vue"
      ),
  },
  {
    path: "/auth-redirect",
    name: "auth redirect",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "authRedirect" */ "../views/auth/redirect/AuthRedirect.vue"
      ),
  },
  {
    path: "/platform-redirect/:platform",
    name: "platform redirect",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "platformRedirect" */ "../views/platform-redirect/PlatformRedirect.vue"
      ),
  },
  // {
  //   path: '*',
  //   redirect: '/login',
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const currentUser = await AuthRepository.observerCurrentAuthedUser();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    return next("/login");
  } else {
    next();
  }
});

export default router;
