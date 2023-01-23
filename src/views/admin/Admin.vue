<template>
  <!-- routes that require you be logged in  -->
  <div class="admin">
    <Header v-bind="{ to: '/', linkLogo: true }"></Header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
const Header = () =>
  import(/* webpackChunkName: "Header" */ "@/layouts/Header.vue");

export default Vue.extend({
  name: "Home",
  components: { Header },
});
</script>
<style lang="scss" scoped>
.admin {
  padding-top: 100px;
}
</style>
