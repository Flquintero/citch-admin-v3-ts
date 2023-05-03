<template>
  <div>
    <div>User</div>
    <CInput
      @input="setFormValue(formData, $v, $event)"
      v-bind="{
        value: formData.name,
        error: hasInputError($v, 'name'),
        validationObject: $v,
        placeholder: 'name',
        label: 'Name',
        name: 'name',
        type: 'text',
        required: true,
      }"
    />
    <CButton @click.native="saveChanges"> Set</CButton>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
const CInput = () =>
  import(
    /* webpackChunkName: "CInput" */ "@/components/elements/BaseInput.vue"
  );
const CButton = () =>
  import(
    /* webpackChunkName: "CButton" */ "@/components/elements/BaseButton.vue"
  );
import { FormFunctions } from "@/utils/form-functionality";
import { required } from "vuelidate/lib/validators";
import type { IFormData } from "@/types/forms/interfaces";
const OrganizationsRepository =
  Vue.prototype.$apiRepository.get("organizations");

export default defineComponent({
  name: "UserProfile",
  components: { CInput, CButton },
  data() {
    return {
      formData: {
        name: "",
      } as IFormData,
    };
  },
  validations: {
    formData: {
      name: {
        required,
      },
    },
  },
  methods: {
    ...FormFunctions,
    async saveChanges() {
      try {
        await OrganizationsRepository.updateOrganization({
          updateData: FormFunctions.formatFormData(this.formData),
        });
      } catch (error: any) {
        console.log("Login error", error);
        this.$alert.error(`Login Error: ${error}`);
      }
    },
  },
});
</script>
