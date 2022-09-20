<template>
  <div id="app">
    <!-- pretty much two choices - those where you need to be authed and does that do not login, signup,etc -->
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
