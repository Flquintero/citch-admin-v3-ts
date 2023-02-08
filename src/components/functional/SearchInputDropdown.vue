<template>
  <div class="search-input">
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FormFunctions } from "@/utils/form-functionality";
import { required } from "vuelidate/lib/validators";
import type { IFormData } from "@/types/forms/interfaces";
const CInput = () =>
  import(
    /* webpackChunkName: "CInput" */ "@/components/elements/BaseInput.vue"
  );

export default defineComponent({
  name: "SearchInput",
  components: { CInput },
  props: {
    placeholder: String,
    label: String,
    name: String,
    description: String,
    type: String,
    required: Boolean,
  },
  data() {
    return {
      saving: false,
      formData: {
        searchValue: "",
      },
    } as IFormData;
  },
  validations: {
    formData: {
      searchValue: {
        required,
      },
    },
  },
  methods: {
    ...FormFunctions,
    initSearch(formData: IFormData, $v: any, $event: any) {
      console.log(formData, $v, $event);
      this.setFormValue(formData, $v, $event);
      this.$emit("updated-search", formData);
    },
  },
});
</script>
<style lang="scss" scoped>
.search-input {
  position: relative;
  &__dropdown {
    width: 100%;
    min-height: 200px;
    padding: 10px;
    background: $white;
    position: absolute;
    top: 60px;
    border: $border-specs;
    @include box-shadow();
    &-item {
      margin-bottom: 10px;
    }
  }
}
</style>
