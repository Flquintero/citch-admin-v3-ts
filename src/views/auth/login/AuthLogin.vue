<template>
  <div class="login">
    <LayoutAuth>
      <template #auth-content
        ><div class="login__form-wrapper">
          <h2>Login</h2>
          <LoginForm />
          <div class="login__form-wrapper__redirect">
            Need an account? <router-link to="/signup">Register</router-link>
          </div>
        </div></template
      >
      <template #auth-advert
        ><div class="login__advert"><LoginAdvert></LoginAdvert></div
      ></template>
    </LayoutAuth>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const LayoutAuth = () =>
  import(/* webpackChunkName: "LayoutAuth" */ "@/layouts/LayoutAuth.vue");
const LoginAdvert = () =>
  import(
    /* webpackChunkName: "LoginAdvert" */ "@/components/layouts/auth/login/LoginAdvert.vue"
  );
const LoginForm = () =>
  import(
    /* webpackChunkName: "LoginForm" */ "@/components/layouts/auth/login/LoginForm.vue"
  );

export default defineComponent({
  name: "AuthLogin",
  components: { LayoutAuth, LoginAdvert, LoginForm },
});
</script>
<style lang="scss" scoped>
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
    height: 100%;
  }
}
</style>
