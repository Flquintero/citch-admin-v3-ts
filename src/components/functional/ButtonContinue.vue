<template>
  <CButton class="continue-button" v-bind="{ variant: 'primary', disabled }">
    <slot>
      <span v-if="loading">
        <font-awesome-icon icon="fa-duotone fa-circle-notch" spin />
        {{ loadingContent }}</span
      ><span v-else
        >{{ textContent }} <font-awesome-icon :icon="`fa-duotone ${textIcon}`"
      /></span>
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
  name: "ContinueButton",
  components: { CButton },
  props: {
    variant: String,
    disabled: Boolean,
    loading: Boolean,
    loadingContent: String,
    textContent: String,
    textIcon: String,
  },
});
</script>
<style lang="scss" scoped>
.continue-button {
  margin: 20px 0;
  max-width: 100%;
  height: 50px !important;
}
</style>
