<template>
  <div class="home">
    <Header></Header>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const Header = () => import(/* webpackChunkName: "Header" */ '@/layouts/Header.vue');

export default Vue.extend({
  name: 'Home',
  components: { Header },
});
</script>
