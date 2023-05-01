<template>
  <div id="app">
    <!-- pretty much two choices - those where you need to be authed and does that do not login, signup,etc -->
    <RouterView />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ResponsiveMixin from "@/mixins/responsive";
import CurrentUserMixin from "@/mixins/current-user";

export default defineComponent({
  name: "App",
  mixins: [ResponsiveMixin, CurrentUserMixin],
  async mounted() {
    // from Mixin
    await this.initGetCurrentUser();
    await this.initSetCurrentUser();
  },
});
</script>
