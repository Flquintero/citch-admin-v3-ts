<template>
  <!-- routes that require you be logged in  -->
  <div class="admin">
    <LayoutHeader v-bind="{ to: '/', linkLogo: true }"></LayoutHeader>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const LayoutHeader = () =>
  import(
    /* webpackChunkName: "LayoutHeader" */ "@/layouts/shared/LayoutHeader.vue"
  );

export default defineComponent({
  name: "AdminIndex",
  components: { LayoutHeader },
});
</script>
<style lang="scss" scoped>
.admin {
  padding-top: 100px;
}
</style>
