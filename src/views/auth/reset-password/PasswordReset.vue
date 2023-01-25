<template>
  <div class="reset-password">
    <LayoutAuth>
      <template #auth-content
        ><div class="reset-password__form-wrapper">
          <h2>Reset Password</h2>
          <ResetPasswordForm />
          <div class="reset-password__form-wrapper__redirect">
            <router-link to="/login">Back to Login</router-link>
          </div>
        </div></template
      >
      <template #auth-advert
        ><div class="reset-password__advert">
          <ResetPasswordAdvert></ResetPasswordAdvert></div
      ></template>
    </LayoutAuth>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const LayoutAuth = () =>
  import(/* webpackChunkName: "LayoutAuth" */ "@/layouts/LayoutAuth.vue");
const ResetPasswordAdvert = () =>
  import(
    /* webpackChunkName: "ResetPasswordAdvert" */ "@/components/layouts/auth/reset-password/ResetPasswordAdvert.vue"
  );
const ResetPasswordForm = () =>
  import(
    /* webpackChunkName: "ResetPasswordForm" */ "@/components/layouts/auth/reset-password/ResetPasswordForm.vue"
  );

export default defineComponent({
  name: "ResetPassword",
  components: { LayoutAuth, ResetPasswordAdvert, ResetPasswordForm },
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
