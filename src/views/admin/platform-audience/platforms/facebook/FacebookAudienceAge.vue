<template>
  <div class="facebook-audience-age">
    <h3 class="facebook-audience-age__title">Please select:</h3>
    <div class="facebook-audience-age__options">
      <div class="facebook-audience-age__options-item">
        <CDropdown
          @option-selected="setMinAge($event)"
          v-bind="{
            placeholder: 'Min Age',
            chosenLabel: 'Min Age',
            chosenOption: formatChosenOption(formData.ageMin),
            options: formatAgeOptions(ageMinRange),
          }"
        />
      </div>
      <div class="facebook-audience-age__options-item">
        <CDropdown
          @option-selected="setMaxAge($event)"
          v-bind="{
            placeholder: 'Max Age',
            chosenLabel: 'Max Age',
            chosenOption: formatChosenOption(formData.ageMax),
            options: formatAgeOptions(ageMaxRange),
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { ageMinRange, ageMaxRange } from "./utils/facebook-age-data";
import { setCompletedAudienceFields } from "../../utils/platform-audience-validation-helper";
import type { PropType } from "vue";
import type { IDropdownOption } from "@/types/components/interfaces";
import type { ITabContent } from "@/types/components/interfaces";

const CDropdown = () =>
  import(
    /* webpackChunkName: "CDropdown" */ "@/components/functional/dropdown-menu/DropdownMenu.vue"
  );

export default defineComponent({
  name: "FacebookAudienceAge",
  props: {
    tabsList: Array as PropType<ITabContent[]>,
  },
  components: { CDropdown },
  data() {
    return {
      ageMinRange,
      ageMaxRange,
      formData: {
        ageMin: null as string | null,
        ageMax: null as string | null,
      },
    };
  },
  mounted() {
    this.checkForSavedAudience();
  },
  methods: {
    ...mapActions("Facebook", ["setCurrentFacebookAudience"]),
    setCompletedAudienceFields,
    setMinAge(ageOption: IDropdownOption) {
      this.formData.ageMin = ageOption.value as string;
      if (this.formData.ageMax) this.validateMinAge();
    },
    validateMinAge() {
      if (
        parseInt(this.formData.ageMin as string) >
        parseInt(this.formData.ageMax as string)
      ) {
        this.$alert.error("Min Age can't be more than Max Age");
        this.formData.ageMin = null;
        return;
      }
      this.updateAudienceState();
    },
    setMaxAge(ageOption: IDropdownOption) {
      this.formData.ageMax = ageOption.value as string;
      if (this.formData.ageMin) this.validateMaxAge();
    },
    validateMaxAge() {
      if (
        parseInt(this.formData.ageMax as string) <
        parseInt(this.formData.ageMin as string)
      ) {
        this.$alert.error("Max Age can't be less than Min Age");
        this.formData.ageMax = null;
        return;
      }
      this.updateAudienceState();
    },
    formatChosenOption(ageValue: string | null) {
      if (ageValue) return { value: ageValue, text: ageValue };
    },
    formatAgeOptions(ageRange: string[]) {
      return ageRange.map((age: string) => {
        return { value: age, text: age };
      });
    },
    updateAudienceState() {
      this.setCurrentFacebookAudience(this.formData);
      this.updateAudienceTabs();
    },
    updateAudienceTabs() {
      const updatedTabs = this.setCompletedAudienceFields(
        this.tabsList as ITabContent[],
        this.currentFacebookAudience
      );
      this.$emit("tab-updated", updatedTabs);
    },
    checkForSavedAudience() {
      if (this.currentFacebookAudience) {
        const { ageMax, ageMin } = this.currentFacebookAudience;
        if (ageMax || ageMin) {
          this.formData = {
            ageMax,
            ageMin,
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
.facebook-audience-age {
  margin: 25px 25px 0;
  &__title {
    text-align: center;
  }
  &__options {
    @include flex-config(
      $flex-wrap: wrap,
      $justify-content: center,
      $align-items: center
    );
    @include center-with-margin($max-width: 400px, $top: 25px);
    &-item {
      flex-grow: 1;
      margin: 10px;
      @include flex-config($justify-content: center);
    }
  }
}
</style>
