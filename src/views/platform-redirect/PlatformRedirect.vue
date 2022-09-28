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
  mounted() {
    this.checkForCode();
  },
  methods: {
    checkForCode() {
      if (this.$route.query.code) {
        this.checkForPlatform();
      } else {
        this.redirectHome();
      }
    },
    checkForPlatform() {
      const { state } = this.$route.query;
      const { platform } = this.$route.params;
      //  CONFIRM STATES MATCH, IF NOT IF NOT RETURN USER HOME AND MAYBE LOGOUT
      if (localStorage.getItem(`${platform}-state`) === state) {
        switch (platform) {
          case 'facebook':
            this.initSaveFacebookData();
          default:
        }
      } else {
        this.redirectHome();
      }
    },
    async initSaveFacebookData() {
      try {
        // this.send to FB api and save to org
        // call a function down here that redirects to the page the user was in - break it apart from what is in old citch admin
      } catch (error: any) {
      } finally {
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
    redirectHome() {
      this.$alert.error('Error Connecting to Platform');
      this.$router.push('/');
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
