<template>
  <div>
    <h1>Awesome, let's connect your Instagram account</h1>
    <!-- This renders the info to connect platforms in the bottom left rectangle -->
    <component :is="getPlatformConnect($route.params.platform)"></component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { platforms } from './utils/platform-connect-helper';

export default Vue.extend({
  name: 'ConnectIndex',
  methods: {
    getPlatformConnect(platform: string) {
      return platforms[platform];
    },
  },
});
</script>
