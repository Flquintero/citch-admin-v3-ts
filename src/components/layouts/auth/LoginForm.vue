<template>
  <div class="login-form">
    <CInput
      @input="setFormValue(formData, $v, $event)"
      v-bind="{
        value: formData.email,
        error: hasInputError($v, 'email'),
        validationObject: $v,
        placeholder: 'Email',
        label: 'Email',
        name: 'email',
        type: 'text',
        required: true,
      }"
    />
    <CInput
      @input="setFormValue(formData, $v, $event)"
      v-bind="{
        value: formData.password,
        error: hasInputError($v, 'password'),
        validationObject: $v,
        placeholder: 'Password',
        label: 'Password',
        name: 'password',
        type: 'password',
        required: true,
      }"
    />
    <div class="login-form__submit">
      <CButton v-bind="{ buttonText: 'Login', variant: 'primary', disabled: $v.$invalid }"
    /></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CInput from '@/components/elements/Input.vue';
import CButton from '@/components/elements/Button.vue';
import { required } from 'vuelidate/lib/validators';
import { FormFunctions } from '@/utils/form-functionality';

export default Vue.extend({
  name: 'LoginForm',
  components: { CInput, CButton },
  data() {
    return {
      formData: {
        email: null,
        password: null,
      } as { [property: string]: any },
    };
  },
  validations: {
    formData: {
      email: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    ...FormFunctions,
    submitSignup() {
      console.log('submit');
    },
  },
});
</script>
<style lang="scss" scoped>
.login-form {
  padding: 20px;
  > .input {
    margin-bottom: 40px;
  }
  &__submit {
    height: 50px;
  }
}
</style>
