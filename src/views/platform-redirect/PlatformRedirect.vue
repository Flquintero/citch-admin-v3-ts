<template>
  <div class="platform-redirect">
    <Header v-bind="{ actions: false }" />
    <div class="platform-redirect__loader"><Loader v-bind="{ size: '6x' }" /></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const Header = () => import(/* webpackChunkName: "Header" */ '@/layouts/Header.vue');
const Loader = () => import(/* webpackChunkName: "Loader" */ '@/components/functional/Loader.vue');
const FacebookRepository = Vue.prototype.$apiRepository.get('facebook');

export default Vue.extend({
  name: 'PlatformRedirect',
  components: { Loader, Header },
  data() {
    return {
      platform: null as string | null,
      redirectPath: null as string | null,
    };
  },
  mounted() {
    this.checkForCode();
  },
  methods: {
    checkForCode() {
      this.platform = this.$route.params.platform;
      this.redirectPath = localStorage.getItem(`redirect-${this.platform}-path`);
      if (this.$route.query.code) {
        this.checkForPlatform();
      } else {
        this.errorRedirect();
      }
    },
    checkForPlatform() {
      const { state } = this.$route.query;
      const platform = this.platform;
      //  CONFIRM STATES MATCH, IF NOT IF NOT RETURN USER HOME AND MAYBE LOGOUT
      if (localStorage.getItem(`${platform}-state`) === state) {
        switch (platform) {
          case 'facebook':
            this.initSaveFacebookData();
          default:
        }
      } else {
        this.errorRedirect();
      }
    },
    async initSaveFacebookData() {
      try {
        const facebookConnectData = {
          code: this.$route.query.code,
        };
        await FacebookRepository.saveUser(facebookConnectData);
      } catch (error: any) {
        console.error('Error Saving Facebook Data Info', error);
        this.$alert.error('Error Saving Platform Info');
      } finally {
        this.redirectToPath();
      }
    },
    // async initResetPasswordCheck() {
    //   try {
    //     let verifyObject: IVerifyPassword = {
    //       oobCode: this.$route.query.oobCode as string,
    //       apiKey: this.$route.query.apiKey as string,
    //     };
    //     const verifiedResponse = await AuthRepository.initVerifyResetPasswordCode(verifyObject);
    //     if (verifiedResponse.email === this.$route.query.email) {
    //       this.showPasswordConfirm = true;
    //     }
    //   } catch (error: any) {
    //     console.log('Password Verification', error);
    //     this.$alert.error('Error Verifying Password. Please Contact support.');
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    redirectToPath() {
      //CHECK LOCAL STORAGE FOR REDIRECT PATH
      if (this.redirectPath) {
        this.$router.push({
          path: this.redirectPath,
        });
        localStorage.removeItem(`redirect-${this.platform}-path`);
        this.redirectPath = null;
      } else {
        this.$router.push('/');
      }
      localStorage.removeItem(`${this.platform}-hash`);
    },
    errorRedirect() {
      this.$alert.error('Error Connecting to Platform');
      this.redirectToPath();
    },
  },
});
</script>
<style lang="scss" scoped>
.platform-redirect {
  height: 100vh;
  width: 100%;
}
</style>
