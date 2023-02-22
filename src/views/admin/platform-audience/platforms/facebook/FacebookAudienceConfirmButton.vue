<template>
  <ContinueButton
    v-if="currentFacebookAudienceComplete"
    @click.native="confirmObjectiveGoal"
    v-bind="{
      variant: 'primary',
      disabled: !currentFacebookAudience || saving,
      loading: saving,
      textContent: formatContinueButton(),
      textIcon: 'fa-arrow-right',
      loadingContent: 'Saving to Continue',
    }"
  ></ContinueButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

const ContinueButton = () =>
  import(
    /* webpackChunkName: "ContinueButton" */ "@/components/functional/ContinueButton.vue"
  );

export default defineComponent({
  name: "FacebookAudienceConfirmButton",
  components: { ContinueButton },
  methods: {
    formatContinueButton() {
      const renderButtonContent = "Confirm Audience";
      //   if (this.isSavedObjectiveGoal) {
      //     if (this.isSameObjectiveGoal) {
      //       renderButtonContent = "Continue";
      //     } else {
      //       renderButtonContent = "Save Change";
      //     }
      //   }
      return renderButtonContent;
    },
  },
  computed: {
    ...mapGetters("Facebook", {
      currentFacebookAudience: "currentFacebookAudience",
      currentFacebookAudienceComplete: "currentFacebookAudienceComplete",
    }),
  },
});
</script>
<style lang="scss" scoped></style>
