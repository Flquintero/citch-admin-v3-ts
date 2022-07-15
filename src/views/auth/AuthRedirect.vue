<template>
  <div class="auth-redirect">
    <Header v-bind="{ actions: false }" />
    <div v-if="loading" class="auth-redirect__loader"><Loader v-bind="{ size: '6x' }" /></div>
    <PasswordConfirm v-else-if="showPasswordConfirm" />
    <ErrorPage v-else />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '@/components/elements/Logo.vue';
import Loader from '@/components/functional/Loader.vue';
import Header from '@/layouts/Header.vue';
import Repository from '@/api-repository/index';
import PasswordConfirm from './PasswordConfirm.vue';
import ErrorPage from '@/components/functional/ErrorPage.vue';
const AuthRepository = Repository.get('auth');

import { IVerifyPassword } from '@/types/auth';

export default Vue.extend({
  name: 'AuthRedirect',
  components: { Logo, Loader, Header, PasswordConfirm, ErrorPage },
  data() {
    return {
      loading: true,
      showPasswordConfirm: false,
    };
  },
  mounted() {
    this.checkForAuthAction();
  },
  methods: {
    checkForAuthAction() {
      const mode = this.$route.query.mode;
      switch (mode) {
        case 'resetPassword':
          this.initResetPasswordCheck();
        default:
      }
    },
    async initResetPasswordCheck() {
      try {
        let verifyObject: IVerifyPassword = {
          oobCode: this.$route.query.oobCode as string,
          apiKey: this.$route.query.oobCode as string,
        };
        const verifiedResponse = await AuthRepository.initVerifyResetPasswordCode(verifyObject);
        if (verifiedResponse.email === this.$route.query.email) {
          this.showPasswordConfirm = true;
        }
        console.log(verifiedResponse);
      } catch (error: any) {
        console.log('Password Verification', error);
        this.$alert.error('Error Verifying Password. Please Contact support.');
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>
<style lang="scss">
.auth-redirect {
  height: 100vh;
  width: 100%;
  position: relative;

  &__loader {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $secondary;
  }
}
</style>
