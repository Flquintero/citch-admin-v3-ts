<template>
  <CButton class="reset-button" v-bind="{ variant: 'primaryOutline' }">
    <slot>
      <span>{{ textContent }}</span>
    </slot>
  </CButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const CButton = () =>
  import(
    /* webpackChunkName: "CButton" */ "@/components/elements/BaseButton.vue"
  );

export default defineComponent({
  name: "ResetButton",
  components: { CButton },
  props: {
    textContent: String,
    textIcon: String,
  },
});
</script>
<style lang="scss" scoped>
.reset-button {
  margin: 20px 0;
  max-width: 100%;
  height: 50px !important;
}
</style>
