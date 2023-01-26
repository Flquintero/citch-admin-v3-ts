<template>
  <div class="facebook-audience-location">
    <!-- Add selected options as badges with clear option -->
    <div class="facebook-audience-location__input">
      <SearchInputDropdown
        v-bind="{
          placeholder: 'Enter Location',
          label: 'Location',
          name: 'Location',
          description: 'Search Country, City, State or Zip',
          required: true,
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const SearchInputDropdown = () =>
  import(
    /* webpackChunkName: "SearchInputDropdown" */ "@/components/functional/SearchInputDropdown.vue"
  );

export default defineComponent({
  name: "FacebookAudienceLocation",
  components: { SearchInputDropdown },
});
</script>
<style lang="scss" scoped>
.facebook-audience-location {
  &__input {
    @include center-with-margin($max-width: 400px, $top: 50px, $bottom: 50px);
  }
}
</style>
