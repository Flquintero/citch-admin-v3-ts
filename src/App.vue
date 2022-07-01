<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import ResponsiveMixin from '@/mixins/responsive';

export default Vue.extend({
  name: 'App',
  mixins: [ResponsiveMixin],
});
</script>
