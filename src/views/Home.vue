<template>
  <div class="home">
    <Header></Header>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/layouts/Header.vue';

export default Vue.extend({
  name: 'Home',
  components: { Header },
});
</script>
