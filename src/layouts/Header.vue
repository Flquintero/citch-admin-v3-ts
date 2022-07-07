<template>
  <div class="header-layout">
    <div class="header-layout__logo">
      <router-link to="/home">
        <Logo />
      </router-link>
    </div>
    <div><CButton @click.native="signOut">Logout</CButton></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CButton from '@/components/elements/Button.vue';
import Logo from '@/components/elements/Logo.vue';
import Repository from '@/api-repository/index';
const AuthRepository = Repository.get('auth');
export default Vue.extend({
  name: 'Header',
  components: { CButton, Logo },
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
    height: 100px;
    padding: 15px;
    max-width: 100%;
    width: 150px;
    display: flex;
  }
}
</style>
