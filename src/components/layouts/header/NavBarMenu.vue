<template>
  <div v-custom-click-outside="closeMenuIfOpen" class="nav-bar-menu">
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
          />
        </div>
        <div>
          <span>{{ currentUser.displayName }}</span>
          <span>{{ currentUser.email }}</span>
        </div>
      </div>
      <div class="nav-bar-menu__content-pages">
        <CButton @click.native="goTo('/post-link')">Promote Post</CButton>
        <CButton @click.native="goTo('/campaigns')">Campaigns</CButton>
        <!-- <CButton>User Settings</CButton> -->
      </div>
      <div class="nav-bar-menu__content-logout">
        <CButton @click.native="signOut"
          ><font-awesome-icon
            icon="fa-duotone fa-arrow-right-from-bracket"
            style="--fa-secondary-opacity: 1"
          />
          <span>Logout</span></CButton
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { defineComponent } from "vue";
import { mapGetters } from "vuex";
const CButton = () =>
  import(
    /* webpackChunkName: "CButton" */ "@/components/elements/BaseButton.vue"
  );
const AuthRepository = Vue.prototype.$apiRepository.get("auth");

export default defineComponent({
  name: "NavBarMenu",
  components: { CButton },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    async signOut() {
      try {
        await AuthRepository.initSignOut();
        this.$router.replace("/login");
        this.$alert.success("Logged Out!");
      } catch (e: any) {
        console.log("Signout error", e);
        this.$alert.error("Logging Out Error:", e);
      }
    },
    goTo(path: string) {
      this.$router.replace(path);
      this.closeMenuIfOpen();
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenuIfOpen() {
      if (this.isMenuOpen) {
        this.toggleMenu();
      }
    },
  },
  computed: {
    ...mapGetters("Users", ["currentUser"]),
  },
});
</script>
<style lang="scss" scoped>
.nav-bar-menu {
  height: 100%;
  width: 100%;
  &__content {
    border: 1px solid $border;
    position: absolute;
    min-height: 100px;
    min-width: 200px;
    width: auto;
    max-width: 250px;
    right: 40px;
    border-radius: 1px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: $white;
    z-index: 100;
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
        word-break: break-all;
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
