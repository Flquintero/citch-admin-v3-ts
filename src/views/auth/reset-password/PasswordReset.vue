<template>
  <div class="reset-password">
    <AuthLayout>
      <template #auth-content
        ><div class="reset-password__form-wrapper">
          <h2>Reset Password</h2>
          <ResetPasswordForm />
          <div class="reset-password__form-wrapper__redirect"
            ><router-link to="/login">Back to Login</router-link></div
          ></div
        ></template
      >
      <template #auth-advert
        ><div class="reset-password__advert"> <ResetPasswordAdvert></ResetPasswordAdvert> </div
      ></template>
    </AuthLayout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const AuthLayout = () => import(/* webpackChunkName: "AuthLayout" */ '@/layouts/Auth.vue');
const ResetPasswordAdvert = () =>
  import(
    /* webpackChunkName: "ResetPasswordAdvert" */ '@/components/layouts/auth/reset-password/ResetPasswordAdvert.vue'
  );
const ResetPasswordForm = () =>
  import(
    /* webpackChunkName: "ResetPasswordForm" */ '@/components/layouts/auth/reset-password/ResetPasswordForm.vue'
  );

export default Vue.extend({
  name: 'ResetPassword',
  components: { AuthLayout, ResetPasswordAdvert, ResetPasswordForm },
});
</script>
<style lang="scss" scoped>
.reset-password {
  height: 100%;
  &__form-wrapper {
    background-color: $white;
    padding: 100px 50px 0;
    @include tablet-and-down {
      padding: 100px 20px 30px;
    }
    h2 {
      margin: 0px auto 20px;
      width: 200px;
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
