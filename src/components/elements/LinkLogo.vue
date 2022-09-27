<template>
  <router-link class="link-logo" :to="to"><Logo /></router-link>
</template>

<script lang="ts">
import Vue from 'vue';
const Logo = () => import(/* webpackChunkName: "Logo" */ '@/components/elements/Logo.vue');

export default Vue.extend({
  name: 'LinkLogo',
  components: { Logo },
  props: {
    to: {
      type: String,
    },
  },
});
</script>
<style lang="scss" scoped>
.link-logo {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>
