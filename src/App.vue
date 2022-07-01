<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import ResponsiveMixin from '@/mixins/responsive';

export default {
  name: 'App',
  mixins: [ResponsiveMixin],
};
</script>
