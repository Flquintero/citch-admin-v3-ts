<template>
  <router-link class="link-logo" :to="to"><Logo /></router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const Logo = () =>
  import(/* webpackChunkName: "Logo" */ "@/components/elements/BaseLogo.vue");

export default defineComponent({
  name: "LinkLogo",
  components: { Logo },
  props: {
    to: String,
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
