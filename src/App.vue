<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import ResponsiveMixin from '@/mixins/responsive';
import CurrentUserMixin from '@/mixins/current-user';

export default CurrentUserMixin.extend({
  name: 'App',
  mixins: [ResponsiveMixin],
  mounted() {
    this.initSetCurrentUser();
  },
});
</script>
