<template>
  <div class="nav-bar-menu">
    <CButton @click.native="toggleMenu">
      <font-awesome-icon
        class="nav-bar-menu__trigger"
        icon="fa-duotone fa-bars"
        size="2x"
        style="--fa-secondary-opacity: 1"
      />
    </CButton>
    <div v-if="isMenuOpen" class="nav-bar-menu__content">
      <div class="nav-bar-menu__content-user">
        <div class="nav-bar-menu__content-user-icon">
          <font-awesome-icon
            class="nav-bar-menu__trigger"
            icon="fa-duotone fa-user"
            style="--fa-secondary-opacity: 1"
        /></div>
        <div><span>Francisco Quintero</span> <span>Flquintero1@gmail.com</span></div>
      </div>
      <div class="nav-bar-menu__content-pages">
        <CButton>Promote Post</CButton>
        <CButton>Campaigns</CButton>
        <CButton @click.native="goToUserSettings">User Settings</CButton>
      </div>
      <div class="nav-bar-menu__content-logout"
        ><CButton @click.native="signOut"
          ><font-awesome-icon
            icon="fa-duotone fa-arrow-right-from-bracket"
            style="--fa-secondary-opacity: 1"
          />
          <span>Logout</span></CButton
        ></div
      >
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
const CButton = () => import(/* webpackChunkName: "CButton" */ '@/components/elements/Button.vue');
import Repository from '@/api-repository/index';
const AuthRepository = Repository.get('auth');
export default Vue.extend({
  name: 'NavBarMenu',
  components: { CButton },
  data() {
    return {
      isMenuOpen: false,
    };
  },
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
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
});
</script>
<style lang="scss">
.nav-bar-menu {
  height: 100%;
  width: 100%;
  &__content {
    border: 1px solid $border;
    position: absolute;
    min-height: 100px;
    width: 200px;
    right: 40px;
    border-radius: 1px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-user {
      padding: 10px;
      border-bottom: 1px solid $border;
      display: flex;
      &-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 10px;
      }
      span {
        font-size: rem(11);
        display: block;
      }
    }
    &-pages {
      margin: 10px 0;
      button {
        margin: 5px 0;
      }
    }
    &-logout {
      border-top: 1px solid $border;
      height: 35px;
      width: 100%;
      span {
        margin-left: 5px;
      }
    }
  }
}
</style>
