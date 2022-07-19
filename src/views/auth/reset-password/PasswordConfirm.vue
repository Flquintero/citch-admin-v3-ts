<template>
  <div class="set-new-password">
    <AuthLayout>
      <template #auth-content
        ><div class="set-new-password__form-wrapper">
          <h2>Set New Password</h2>
          <NewPasswordForm />
          <div class="set-new-password__form-wrapper__redirect"
            ><router-link to="/login">Back to Login</router-link></div
          ></div
        ></template
      >
      <template #auth-advert
        ><div class="set-new-password__advert"> <NewPasswordAdvert></NewPasswordAdvert> </div
      ></template>
    </AuthLayout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AuthLayout from '@/layouts/Auth.vue';
import NewPasswordAdvert from '@/components/layouts/auth/reset-password/NewPasswordAdvert.vue';
import NewPasswordForm from '@/components/layouts/auth/reset-password/NewPasswordForm.vue';

export default Vue.extend({
  name: 'ResetPassword',
  components: { AuthLayout, NewPasswordAdvert, NewPasswordForm },
});
</script>
<style lang="scss">
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
