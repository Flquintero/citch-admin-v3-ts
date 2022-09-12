<template>
  <div class="header-layout">
    <div class="header-layout__logo">
      <LinkLogo v-if="linkLogo" v-bind="{ to: '/login' }" />
      <Logo v-else />
    </div>
    <div v-if="actions"><CButton @click.native="signOut">Logout</CButton></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const CButton = () => import(/* webpackChunkName: "CButton" */ '@/components/elements/Button.vue');
const Logo = () => import(/* webpackChunkName: "Logo" */ '@/components/elements/Logo.vue');
const LinkLogo = () =>
  import(/* webpackChunkName: "LinkLogo" */ '@/components/elements/LinkLogo.vue');
import Repository from '@/api-repository/index';
const AuthRepository = Repository.get('auth');
export default Vue.extend({
  name: 'Header',
  components: { CButton, Logo, LinkLogo },
  props: {
    actions: { type: Boolean, default: true },
    linkLogo: { type: Boolean, default: false },
    to: { type: String },
  },
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
  },
});
</script>
<style lang="scss">
.header-layout {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  &__logo {
    padding: 15px;
    width: 150px;
    display: flex;
  }
}
</style>
