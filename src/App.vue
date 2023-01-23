<template>
  <div id="app">
    <!-- pretty much two choices - those where you need to be authed and does that do not login, signup,etc -->
    <RouterView />
  </div>
</template>
<script lang="ts">
import ResponsiveMixin from "@/mixins/responsive";
import CurrentUserMixin from "@/mixins/current-user";
import { defineComponent } from "vue";

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
