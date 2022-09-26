<template>
  <div>
    <div>
      <h1
        >Awesome, let's connect your
        <SelectedContent v-bind="{ content: $route.params.platform, capitalize: true }" />
        account</h1
      >
    </div>
    <div>
      <chosen-post></chosen-post>
      <!-- This renders the info to connect platforms in the bottom left rectangle -->
      <component :is="getPlatformConnect($route.params.platform)"></component>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { platforms } from './utils/platform-connect-helper';
import SelectedContent from '@/components/functional/SelectedContent.vue';

export default Vue.extend({
  name: 'ConnectIndex',
  components: { SelectedContent },
  methods: {
    getPlatformConnect(platform: string) {
      return platforms[platform];
    },
  },
});
</script>
