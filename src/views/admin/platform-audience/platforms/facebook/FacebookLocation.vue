<template>
  <div class="facebook-audience-location">
    <SelectedItems
      :items-list="chosenLocations"
      render-text-key="name"
      @removed-item="updateChosenLocations($event)"
    />
    <div class="facebook-audience-location__input">
      <CInput
        @input="facebookLocationSearchDebounced(formData, $v, $event)"
        @clear="facebookLocationClear(formData, $v, $event)"
        v-bind="{
          value: formData.searchLocationValue,
          error: hasInputError($v, 'searchLocationValue'),
          validationObject: $v,
          placeholder: 'Enter Location',
          label: 'Location',
          name: 'searchLocationValue',
          description: 'Search for Country, State, City and/or Zipcode', // find a post from citch and add here
          type: 'text',
          required: true,
          isLoading: isSearching,
          isDisabled: isSearching,
          isClearable: true,
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
import { FormFunctions } from "@/utils/form-functionality";
import { required } from "vuelidate/lib/validators";
import type { IFacebookLocation } from "@/types/facebook/audience/interfaces";
import type { IFormData } from "@/types/forms/interfaces";
import { _debounce } from "@/utils/formatting";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

const SelectedItems = () =>
  import(
    /* webpackChunkName: "SelectedItems" */ "@/components/functional/SelectedItems.vue"
  );

const CInput = () =>
  import(
    /* webpackChunkName: "CInput" */ "@/components/elements/BaseInput.vue"
  );
const DropdownList = () =>
  import(
    /* webpackChunkName: "DropdownList" */ "@/components/functional/dropdown-menu/partials/DropdownList.vue"
  );

export default defineComponent({
  name: "FacebookAudienceLocation",
  components: { SelectedItems, CInput, DropdownList },
  data() {
    return {
      isSearching: false,
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
  created() {
    /// To do: need to type it
    this.facebookLocationSearchDebounced = _debounce(
      this.initFacebookLocationSearch,
      400
    ) as (any: any) => Promise<any>;
  },
  validations: {
    formData: {
      searchLocationValue: {
        required,
      },
    },
  },
  methods: {
    ...FormFunctions,
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
      return true;
    },
    setChosenLocation(location: IFacebookLocation) {
      if (this.hasChosenLocation(location)) {
        this.$alert.error("This Location has already been chosen");
        return;
      }
      this.chosenLocations.push(location);
      console.log("location", location);
    },
    updateChosenLocations(locationIndex: number) {
      this.chosenLocations.splice(locationIndex, 1);
    },
  },
});
</script>
<style lang="scss" scoped>
// rest of styling for native input is in asssets elements
.facebook-audience-location {
  &__input {
    @include center-with-margin($max-width: 400px, $top: 50px, $bottom: 50px);
    position: relative;
  }
}
</style>
