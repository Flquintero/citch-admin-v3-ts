<template>
  <div class="facebook-audience-interest">
    <h3 class="facebook-audience-interest__title">
      {{ hasChosenInterests ? "Selected Interests:" : "Enter Interest" }}
    </h3>
    <div
      v-if="!!chosenInterests.length"
      class="facebook-audience-interest__selected-items"
    >
      <CPill
        v-for="(item, index) in chosenInterests"
        :pill-text="item.name"
        :pill-index="index"
        :key="`${index}-${item.name}`"
        @remove="updateChosenInterests($event)"
      />
    </div>
    <div class="facebook-audience-interest__input">
      <CInput
        @input="facebookInterestSearchDebounced(formData, $v, $event)"
        @clear="facebookInterestClear(formData, $v, $event)"
        v-bind="{
          value: formData.searchInterestValue,
          error: hasInputError($v, 'searchInterestValue'),
          validationObject: $v,
          placeholder: `${
            hasChosenInterests ? 'Enter another Interest' : 'Enter Interest'
          }`,
          label: 'Interest',
          name: 'searchInterestValue',
          description: 'Search for any interest such as: Baseball', // Zip is suppose to work but i dont know what happened
          type: 'text',
          required: false,
          isLoading: isSearching,
          isClearable: true,
          resetInput: isResetSearch,
        }"
      />
      <DropdownList v-if="interestResults">
        <template #dropdown-list-content>
          <div
            class="dropdown-list__item"
            v-for="(interest, index) in interestResults"
            :key="`${interest.key}-${index}`"
            @click="setChosenInterest(interest)"
          >
            <span>{{ interestText(interest) }}</span>
          </div>
        </template>
      </DropdownList>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import type { PropType } from "vue";
import { mapActions, mapGetters } from "vuex";
import { FormFunctions } from "@/utils/form-functionality";
import { setCompletedAudienceFields } from "../../utils/platform-audience-validation-helper";
import type { IFacebookInterest } from "@/types/facebook/campaigns/interfaces";
import type { IFormData } from "@/types/forms/interfaces";
import type { ITabContent } from "@/types/components/interfaces";
import { _debounce, _deepCopy } from "@/utils/formatting";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

const CPill = () =>
  import(/* webpackChunkName: "CPill" */ "@/components/elements/BasePill.vue");

const CInput = () =>
  import(
    /* webpackChunkName: "CInput" */ "@/components/elements/BaseInput.vue"
  );
const DropdownList = () =>
  import(
    /* webpackChunkName: "DropdownList" */ "@/components/functional/dropdown-menu/partials/DropdownList.vue"
  );

export default defineComponent({
  name: "FacebookAudienceInterest",
  components: { CPill, CInput, DropdownList },
  props: {
    tabsList: Array as PropType<ITabContent[]>,
  },
  data() {
    return {
      isSearching: false,
      isResetSearch: false,
      formData: {
        searchInterestValue: null,
      } as IFormData,
      interestResults: null as null | IFacebookInterest[],
      // To do: need to type it
      facebookInterestSearchDebounced: null as
        | null
        | ((any: any) => Promise<any>),
      chosenInterests: [] as IFacebookInterest[],
    };
  },
  validations: {
    formData: {
      searchInterestValue: {},
    },
  },
  created() {
    /// To do: need to type it
    this.facebookInterestSearchDebounced = _debounce(
      this.initFacebookInterestSearch,
      400
    ) as (any: any) => Promise<any>;
  },
  mounted() {
    this.checkForSavedAudience();
  },
  methods: {
    ...mapActions("Facebook", {
      setCurrentFacebookAudience: "setCurrentFacebookAudience",
    }),
    ...FormFunctions,
    setCompletedAudienceFields,
    async initFacebookInterestSearch(
      formData: IFormData,
      $v: any,
      $event: any
    ) {
      this.setFormValue(formData, $v, $event);
      if (formData.searchInterestValue.length < 1) {
        this.interestResults = null;
        return;
      }
      try {
        this.isSearching = true;
        this.interestResults = await FacebookRepository.getInterests(
          formData.searchInterestValue
        );
      } catch (error: any) {
        console.error("Error Facebook Getting Interests", error);
        this.$alert.error("Error Facebook Getting Interests");
      } finally {
        this.isSearching = false;
      }
    },
    facebookInterestClear(formData: IFormData, $v: any, $event: any) {
      this.setFormValue(formData, $v, $event);
      this.interestResults = null;
    },
    interestText(interest: IFacebookInterest) {
      return interest.name;
    },
    hasChosenInterest(interest: IFacebookInterest) {
      return !!this.chosenInterests.find(
        (interestItem: IFacebookInterest) => interestItem.id === interest.id
      );
    },
    setChosenInterest(interest: IFacebookInterest) {
      if (this.hasChosenInterest(interest)) {
        this.$alert.error("This Interest has already been chosen");
        return;
      }
      this.chosenInterests.push(interest);
      this.setCurrentFacebookAudience({
        chosenInterests: _deepCopy(this.chosenInterests),
      });
      this.updateAudienceTabs();
      this.resetSearch();
    },
    resetSearch() {
      this.isResetSearch = true;
      setTimeout(() => {
        this.isResetSearch = false;
      }, 100);
    },
    updateAudienceTabs() {
      const updatedTabs = this.setCompletedAudienceFields(
        this.tabsList as ITabContent[],
        this.currentFacebookAudience
      );
      this.$emit("tab-updated", updatedTabs);
    },
    updateChosenInterests(interestIndex: number) {
      console.log("index", interestIndex);
      this.chosenInterests.splice(interestIndex, 1);
      this.setCurrentFacebookAudience({
        chosenInterests: _deepCopy(this.chosenInterests),
      });
      this.updateAudienceTabs();
    },
    checkForSavedAudience() {
      if (this.currentFacebookAudience) {
        const { chosenInterests } = _deepCopy(this.currentFacebookAudience);
        if (chosenInterests) {
          this.chosenInterests = chosenInterests;
        }
      }
    },
  },
  computed: {
    ...mapGetters("Facebook", {
      currentFacebookAudience: "currentFacebookAudience",
      isFacebookAudienceUpdated: "isFacebookAudienceUpdated",
    }),
    hasChosenInterests(): boolean {
      return this.chosenInterests.length > 0;
    },
  },
  watch: {
    /* 
      This variable is a good indication that the reset changes button is clicked, and if it went from true to false then reset and check
      for saved values so it resets chosen locations 
    */
    isFacebookAudienceUpdated(isUpdated: boolean) {
      if (!isUpdated) {
        this.checkForSavedAudience();
      }
    },
  },
});
</script>
<style lang="scss" scoped>
// rest of styling for native input is in asssets elements
.facebook-audience-interest {
  margin: 25px 25px 0;
  &__title {
    text-align: center;
  }
  &__selected-items {
    @include flex-config($flex-wrap: wrap);
    @include center-with-margin($max-width: 750px, $top: 20px, $bottom: 20px);
  }
  &__input {
    @include center-with-margin($max-width: 400px, $top: 50px, $bottom: 50px);
    position: relative;
  }
}
</style>
