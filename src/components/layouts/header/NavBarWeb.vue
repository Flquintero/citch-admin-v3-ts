<template>
  <div
    ><CButton @click.native="goToUserSettings">User Settings</CButton
    ><CButton @click.native="signOut">Logout</CButton>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
const CButton = () => import(/* webpackChunkName: "CButton" */ '@/components/elements/Button.vue');
import Repository from '@/api-repository/index';
const AuthRepository = Repository.get('auth');
export default Vue.extend({
  name: 'NavBarWeb',
  components: { CButton },
  mounted() {},
  methods: {
    async signOut() {
      try {
        await AuthRepository.initSignOut();
        this.$router.replace('/login');
        this.$alert.success('Logged Out!');
      } catch (e: any) {
        console.log('Signout error', e);
        this.$alert.error('Logging Out Error:', e);
      }
    },
    goToUserSettings() {
      this.$router.replace('/settings/user');
    },
  },
});
</script>
