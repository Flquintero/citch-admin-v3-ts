<template>
  <div class="set-new-password">
    <LayoutAuth>
      <template #auth-content
        ><div class="set-new-password__form-wrapper">
          <h2>Set New Password</h2>
          <NewPasswordForm />
          <div class="set-new-password__form-wrapper__redirect">
            <router-link to="/login">Back to Login</router-link>
          </div>
        </div></template
      >
      <template #auth-advert
        ><div class="set-new-password__advert">
          <NewPasswordAdvert></NewPasswordAdvert></div
      ></template>
    </LayoutAuth>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const LayoutAuth = () =>
  import(/* webpackChunkName: "LayoutAuth" */ "@/layouts/LayoutAuth.vue");
const NewPasswordAdvert = () =>
  import(
    /* webpackChunkName: "NewPasswordAdvert" */ "@/components/layouts/auth/reset-password/NewPasswordAdvert.vue"
  );
const NewPasswordForm = () =>
  import(
    /* webpackChunkName: "NewPasswordForm" */ "@/components/layouts/auth/reset-password/NewPasswordForm.vue"
  );

export default defineComponent({
  name: "ResetPassword",
  components: { LayoutAuth, NewPasswordAdvert, NewPasswordForm },
});
</script>
<style lang="scss" scoped>
.set-new-password {
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
