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
import Vue from 'vue';
const CInput = () => import(/* webpackChunkName: "CInput" */ '@/components/elements/Input.vue');
const CButton = () => import(/* webpackChunkName: "CButton" */ '@/components/elements/Button.vue');
import { FormFunctions } from '@/utils/form-functionality';
import { required } from 'vuelidate/lib/validators';
const OrganizationsRepository = Vue.prototype.$apiRepository.get('organizations');

export default Vue.extend({
  name: 'UserProfile',
  components: { CInput, CButton },
  data() {
    return {
      formData: {
        name: '',
      },
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
        let updatedUser = await OrganizationsRepository.updateOrganization({
          updateData: FormFunctions.formatFormData(this.formData),
        });
        console.log('udated user', updatedUser);
      } catch (error: any) {
        console.log('Login error', error);
        this.$alert.error(`Login Error: ${error}`);
      } finally {
      }
    },
  },
});
</script>
