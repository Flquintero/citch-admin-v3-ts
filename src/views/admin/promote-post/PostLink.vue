<template>
  <div class="choose-post-link">
    <div class="choose-post-link__title">
      <h1>Enter the link of the post you want to promote below:</h1></div
    >
    <div class="choose-post-link__input">
      <CInput
        @input="setFormValue(formData, $v, $event)"
        v-bind="{
          value: formData.postUrl,
          error: hasInputError($v, 'postUrl'),
          validationObject: $v,
          placeholder: 'Enter Post Url',
          label: 'Post Url',
          name: 'postUrl',
          type: 'text',
          required: true,
        }"
    /></div>
    <div class="choose-post-link__confirm">
      <CButton
        @click.native="saveChanges"
        v-bind="{ variant: 'primary', disabled: $v.$invalid || saving }"
      >
        <span v-if="saving">
          <font-awesome-icon icon="fa-duotone fa-circle-notch" spin /> Saving to Continue</span
        ><span v-else>Confirm</span></CButton
      >
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
const CInput = () => import(/* webpackChunkName: "CInput" */ '@/components/elements/Input.vue');
const CButton = () => import(/* webpackChunkName: "CButton" */ '@/components/elements/Button.vue');
import { FormFunctions } from '@/utils/form-functionality';
import { required } from 'vuelidate/lib/validators';

export default Vue.extend({
  name: 'PostLink',
  components: { CInput, CButton },
  data() {
    return {
      saving: false,
      formData: {
        postUrl: '',
      },
    };
  },
  validations: {
    formData: {
      postUrl: {
        required,
      },
    },
  },
  methods: {
    ...FormFunctions,
    async saveChanges() {
      try {
      } catch (error: any) {
        console.log('Login error', error);
        this.$alert.error(`Login Error: ${error}`);
      } finally {
      }
    },
  },
});
</script>
<style lang="scss">
.choose-post-link {
  text-align: center;
  padding: 50px;
  &__input {
    max-width: 650px;
    margin: 30px auto 50px;
  }
  &__confirm {
    max-width: 200px;
    height: 50px;
    margin: auto;
  }
}
</style>
