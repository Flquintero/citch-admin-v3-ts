<template>
  <div class="facebook-audience-gender">
    <div class="facebook-audience-gender__options">
      <ChooseSingleList
        @option-selected="setChosenGender"
        item-width="100px"
        item-max-width="100px"
        :display-name-underline="false"
        :chosen-option="formatChosenGender()"
        :options-list="formatGenderOptions()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { genderOptions } from "./utils/facebook-gender-data";
import { setCompletedAudienceFields } from "../../utils/platform-audience-validation-helper";
import { _capitalizeString } from "@/utils/formatting";
import type { PropType } from "vue";
import type { ITabContent } from "@/types/components/interfaces";
import { EFacebookAudienceItems } from "@/types/facebook/campaigns/enums";
import type { IChooseListOption } from "@/types/components/interfaces";

const ChooseSingleList = () =>
  import(
    /* webpackChunkName: "ChooseSingleList" */ "@/components/functional/ChooseSingleList.vue"
  );

export default defineComponent({
  name: "FacebookAudienceGender",
  props: {
    tabsList: Array as PropType<ITabContent[]>,
  },
  components: { ChooseSingleList },
  data() {
    return {
      genderOptions,
      formData: { gender: null as string | null },
    };
  },
  mounted() {
    this.checkForSavedAudience();
  },
  methods: {
    ...mapActions("Facebook", ["setCurrentFacebookAudience"]),
    setCompletedAudienceFields,
    formatGenderOptions() {
      return genderOptions.map((gender: string) => {
        return { name: gender, displayName: _capitalizeString(gender) };
      });
    },
    setChosenGender(genderOption: IChooseListOption) {
      this.formData.gender = genderOption.name;
      this.setCurrentFacebookAudience(this.formData);
      this.updateAudienceTabs();
    },
    formatChosenGender(): IChooseListOption {
      return {
        name: this.formData.gender as string,
        displayName: _capitalizeString(this.formData.gender as string),
      } as IChooseListOption;
    },
    updateAudienceTabs() {
      const updatedTabs = this.setCompletedAudienceFields(
        EFacebookAudienceItems.gender,
        this.tabsList as ITabContent[],
        this.currentFacebookAudience
      );
      this.$emit("tab-updated", updatedTabs);
    },
    checkForSavedAudience() {
      if (this.currentFacebookAudience) {
        const { gender } = this.currentFacebookAudience;
        if (gender) {
          this.formData = {
            gender,
          };
        }
      }
    },
  },
  computed: {
    ...mapGetters("Facebook", ["currentFacebookAudience"]),
  },
});
</script>
<style lang="scss" scoped>
.facebook-audience-gender {
  &__options {
    @include flex-config(
      $flex-wrap: wrap,
      $justify-content: center,
      $align-items: center
    );
    @include center-with-margin($max-width: 600px, $top: 20px);
    &-item {
      flex-grow: 1;
      margin: 10px;
    }
  }
}
</style>
