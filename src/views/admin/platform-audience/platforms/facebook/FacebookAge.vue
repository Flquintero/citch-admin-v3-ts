<template>
  <div class="facebook-audience-age">
    <div class="facebook-audience-age-min">
      <CDropdown
        @option-selected="setMinAge($event)"
        v-bind="{
          placeholder: 'Choose Min Age',
          chosenOption: formData.ageMin,
          options: formatAgeOptions(ageMinRange),
        }" />
    </div>
    <div class="facebook-audience-age-max">
      <CDropdown
        @option-selected="setMaxAge($event)"
        v-bind="{
          placeholder: 'Choose Max Age',
          chosenOption: formData.ageMax,
          options: formatAgeOptions(ageMaxRange),
        }" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ageMinRange, ageMaxRange } from './utils/facebook-age-data';
import CDropdown from '@/components/elements/Dropdown.vue';

export default Vue.extend({
  name: 'FacebookAudienceAge',
  components: { CDropdown },
  data() {
    return {
      ageMinRange,
      ageMaxRange,
      formData: { ageMin: null as string | null, ageMax: null as string | null },
    };
  },
  methods: {
    setMinAge(age: string) {},
    setMaxAge(age: string) {},
    formatAgeOptions(ageRange: string[]) {
      return ageRange.map((age: string) => {
        return { value: age, text: age };
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.facebook-audience-age {
}
</style>
