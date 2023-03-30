<template>
  <div class="facebook-audience-location">
    <h3 class="facebook-audience-location__title">
      {{ hasChosenLocations ? "Selected Locations:" : "Enter Location" }}
    </h3>
    <div
      v-if="!!chosenLocations.length"
      class="facebook-audience-location__selected-items"
    >
      <CPill
        v-for="(item, index) in chosenLocations"
        :pill-text="formatChosenLocationText(item)"
        :pill-index="index"
        :key="`${index}-${formatChosenLocationText(item)}`"
        @remove="updateChosenLocations($event)"
      />
    </div>
    <div class="facebook-audience-location__input">
      <CInput
        @input="facebookLocationSearchDebounced(formData, $v, $event)"
        @clear="facebookLocationClear(formData, $v, $event)"
        v-bind="{
          value: formData.searchLocationValue,
          error: hasInputError($v, 'searchLocationValue'),
          validationObject: $v,
          placeholder: `${
            hasChosenLocations ? 'Enter another Location' : 'Enter Location'
          }`,
          label: 'Location',
          name: 'searchLocationValue',
          description: 'Search for Country, State or City', // Zip is suppose to work but i dont know what happened
          type: 'text',
          required: true,
          isLoading: isSearching,
          isClearable: true,
          resetInput: isResetSearch,
        }"
      />
      <DropdownList v-if="locationResults">
        <template #dropdown-list-content>
          <div
            class="dropdown-list__item"
            v-for="(location, index) in locationResults"
            :key="`${location.key}-${index}`"
            @click="setChosenLocation(location)"
          >
            <span>{{ locationText(location) }}</span>
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
import type { IFacebookLocation } from "@/types/facebook/campaigns/interfaces";
import type { IFormData } from "@/types/forms/interfaces";
import type { ITabContent } from "@/types/components/interfaces";
import { _debounce, _deepCopy } from "@/utils/formatting";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

const CInput = () =>
  import(
    /* webpackChunkName: "CInput" */ "@/components/elements/BaseInput.vue"
  );
const DropdownList = () =>
  import(
    /* webpackChunkName: "DropdownList" */ "@/components/functional/dropdown-menu/partials/DropdownList.vue"
  );
const CPill = () =>
  import(/* webpackChunkName: "CPill" */ "@/components/elements/BasePill.vue");

export default defineComponent({
  name: "FacebookAudienceLocation",
  components: { CInput, DropdownList, CPill },
  props: {
    tabsList: Array as PropType<ITabContent[]>,
  },
  data() {
    return {
      isSearching: false,
      isResetSearch: false,
      formData: {
        searchLocationValue: null,
      } as IFormData,
      locationResults: null as null | IFacebookLocation[],
      // To do: need to type it
      facebookLocationSearchDebounced: null as
        | null
        | ((any: any) => Promise<any>),
      chosenLocations: [] as IFacebookLocation[],
    };
  },
  validations: {
    formData: {
      searchLocationValue: {},
    },
  },
  created() {
    /// To do: need to type it
    this.facebookLocationSearchDebounced = _debounce(
      this.initFacebookLocationSearch,
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
    async initFacebookLocationSearch(
      formData: IFormData,
      $v: any,
      $event: any
    ) {
      this.setFormValue(formData, $v, $event);
      if (formData.searchLocationValue.length < 1) {
        this.locationResults = null;
        return;
      }
      try {
        this.isSearching = true;
        this.locationResults = await FacebookRepository.getLocations(
          formData.searchLocationValue
        );
      } catch (error: any) {
        console.error("Error Facebook Getting Locations", error);
        this.$alert.error("Error Facebook Getting Locations");
      } finally {
        this.isSearching = false;
      }
    },
    facebookLocationClear(formData: IFormData, $v: any, $event: any) {
      this.setFormValue(formData, $v, $event);
      this.locationResults = null;
    },
    locationText(location: IFacebookLocation) {
      switch (location.type) {
        case "country":
          return location.country_name;
        case "region":
          return `${location.name}, ${location.country_name}`;
        case "city":
          return ` ${location.name}, ${location.region},
              ${location.country_name}`;
        case "zip":
          return `${location.name}, ${location.primary_city},
              ${location.region}, ${location.country_name}`;
        default:
          return location.name;
      }
    },
    hasChosenLocation(location: IFacebookLocation) {
      return !!this.chosenLocations.find(
        (locationItem: IFacebookLocation) => locationItem.key === location.key
      );
    },
    setChosenLocation(location: IFacebookLocation) {
      if (this.hasChosenLocation(location)) {
        this.$alert.error("This Location has already been chosen");
        return;
      }
      this.chosenLocations.push(location);
      this.setCurrentFacebookAudience({
        chosenLocations: _deepCopy(this.chosenLocations),
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
    updateChosenLocations(locationIndex: number) {
      this.chosenLocations.splice(locationIndex, 1);
      this.setCurrentFacebookAudience({
        chosenLocations: _deepCopy(this.chosenLocations),
      });
      this.updateAudienceTabs();
    },
    checkForSavedAudience() {
      if (this.currentFacebookAudience) {
        const { chosenLocations } = _deepCopy(this.currentFacebookAudience);
        if (chosenLocations) {
          this.chosenLocations =
            this.formatSavedChosenLocationPayload(chosenLocations);
        }
      }
    },
    formatSavedChosenLocationPayload(
      savedChosenLocations: IFacebookLocation[]
    ) {
      return savedChosenLocations.map((location: IFacebookLocation) => {
        return {
          ...location,
          type: this.setSavedChosenLocationType(location),
        } as IFacebookLocation;
      });
    },
    setSavedChosenLocationType(location: IFacebookLocation) {
      const { country, region_id, primary_city_id } = location;
      const isCountry = !country;
      const isState = country && !region_id && !primary_city_id;
      const isCity = country && region_id && !primary_city_id;
      const isZipCode = country && region_id && primary_city_id;
      if (isCountry) {
        return "country";
      } else if (isState) {
        return "region";
      } else if (isCity) {
        return "city";
      } else if (isZipCode) {
        return "zip";
      } else {
        throw new Error("Count not format location type");
      }
    },
    formatChosenLocationText(item: IFacebookLocation) {
      // NOTE: One possibility is to put a country library in backend and return country code and country name

      /*
        IMPORTANT: The big problem here is that what facebook returns in the search is different then when saved campaign gives back audience

        Note:
        When its a country it has country_code when it comes back from searcg and we format it the same way when it comes back from backend. The rest don't have it.
        Also country_code and key are the same for countries in both search and front end

        if there is no name its because its a country our type country so it will only have country nothing else
        if there is no name then no need for first comma
        if there is name it could have region, if not then just country comes after
        if it has region then it needs a second comma, if not then doesnt need it
        if it has region then the last portion would be country
      */

      // Country has a different format
      const isCountry = !item.name || item.type === "country";
      if (isCountry) {
        return item.country_code;
      }
      const renderText = `${item.name}${item.name ? "," : ""}${" "}${
        item.name ? item.region || item.country || item.country_code : ""
      }${item.region ? "," : ""} ${
        item.region ? item.country || item.country_code : ""
      }`;
      return renderText;
    },
  },
  computed: {
    ...mapGetters("Facebook", {
      currentFacebookAudience: "currentFacebookAudience",
      isFacebookAudienceUpdated: "isFacebookAudienceUpdated",
    }),
    hasChosenLocations(): boolean {
      return this.chosenLocations.length > 0;
    },
    // There is a problem when faceboook returns country that only returns the code
    // so we need to render code for now so there is no confusion when we get the saved values
    formattedChosenLocations(): any[] {
      return this.chosenLocations.map((location: IFacebookLocation) => {
        return {
          ...location,
          included_render_key:
            location.type === "country" || !location.type
              ? "country_code"
              : "name",
        };
      });
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
.facebook-audience-location {
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
