<template>
  <div class="login">
    <AuthLayout>
      <template #auth-content
        ><div class="login__form-wrapper">
          <h2>Login</h2>
          <LoginForm />
          <div class="login__form-wrapper__redirect"
            >Need an account? <router-link to="/signup">Register</router-link></div
          ></div
        ></template
      >
      <template #auth-advert
        ><div class="login__advert"> <LoginAdvert></LoginAdvert> </div
      ></template>
    </AuthLayout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const AuthLayout = () => import(/* webpackChunkName: "AuthLayout" */ '@/layouts/Auth.vue');
const LoginAdvert = () =>
  import(/* webpackChunkName: "LoginAdvert" */ '@/components/layouts/auth/login/LoginAdvert.vue');
const LoginForm = () =>
  import(/* webpackChunkName: "LoginForm" */ '@/components/layouts/auth/login/LoginForm.vue');

export default Vue.extend({
  name: 'Login',
  components: { AuthLayout, LoginAdvert, LoginForm },
  mounted() {
    this.$analyticsFunctions.track({ event: 'Login Page Viewed' });
  },
});
</script>
<style lang="scss">
.login {
  height: 100%;
  &__form-wrapper {
    background-color: $white;
    padding: 100px 50px 0;
    @include tablet-and-down {
      padding: 100px 20px 30px;
    }
    h2 {
      margin: 0px auto 20px;
      width: 100px;
    }

    &__redirect {
      padding: 20px;
      text-align: center;
    }
  }
  &__advert {
    background-color: $primary;
  }
}
</style>
