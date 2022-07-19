<template>
  <div class="signup">
    <AuthLayout>
      <template #auth-content
        ><div class="signup__form-wrapper"
          ><h2>Get Started</h2> <SignupForm />
          <div class="signup__form-wrapper__redirect"
            >Already have an account? <router-link to="/login">Login</router-link></div
          >
        </div></template
      >
      <template #auth-advert
        ><div class="signup__advert"> <SignupAdvert></SignupAdvert> </div
      ></template>
    </AuthLayout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AuthLayout from '@/layouts/Auth.vue';
import SignupAdvert from '@/components/layouts/auth/signup/SignupAdvert.vue';
import SignupForm from '@/components/layouts/auth/signup/SignupForm.vue';

export default Vue.extend({
  name: 'Signup',
  components: { AuthLayout, SignupAdvert, SignupForm },
});
</script>
<style lang="scss">
.signup {
  height: 100%;
  &__form-wrapper {
    background-color: $white;
    padding: 100px 50px 0;
    @include tablet-and-down {
      padding: 100px 20px 30px;
    }
    h2 {
      margin: 0px auto 20px;
      width: 150px;
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
