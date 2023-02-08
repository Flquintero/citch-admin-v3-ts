<template>
  <div class="facebook-audience-location">
    <!-- Add selected options as badges with clear option -->
    <div class="facebook-audience-location__input">
      <CInput
        @input="initSearch(formData, $v, $event)"
        v-bind="{
          value: formData.searchValue,
          error: hasInputError($v, 'searchValue'),
          validationObject: $v,
          placeholder,
          label,
          name,
          description,
          type,
          required,
        }"
      />
      <div class="search-input__dropdown">
        <div class="search-input__dropdown-item"><span>Delray Beach</span></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const CInput = () =>
  import(
    /* webpackChunkName: "CInput" */ "@/components/elements/BaseInput.vue"
  );

export default defineComponent({
  name: "FacebookAudienceLocation",
  components: { CInput },
  methods: {
    initFacebookLocationSearch() {
      console.log("searching");
    },
  },
});
</script>
<style lang="scss" scoped>
.facebook-audience-location {
  &__input {
    @include center-with-margin($max-width: 400px, $top: 50px, $bottom: 50px);
  }
}
</style>
