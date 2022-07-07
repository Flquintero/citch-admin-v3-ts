<template>
  <router-link :to="to"><Logo /></router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '@/components/elements/Logo.vue';

export default Vue.extend({
  name: 'LinkLogo',
  components: { Logo },
  props: {
    to: {
      type: String,
    },
  },
});
</script>
