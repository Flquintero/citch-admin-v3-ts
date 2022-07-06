<template>
  <div class="signup-form">
    <CInput
      @input="setFormValue($event)"
      v-bind="{
        value: formData.firstName,
        error: hasInputError('firstName'),
        validationObject: $v,
        placeholder: 'First Name',
        label: 'First Name',
        name: 'firstName',
        type: 'text',
        required: true,
      }"
    />
    <CInput
      @input="setFormValue($event)"
      v-bind="{
        value: formData.lastName,
        error: hasInputError('lastName'),
        validationObject: $v,
        placeholder: 'Last Name',
        label: 'Last Name',
        name: 'lastName',
        type: 'text',
        required: true,
      }"
    />
    <CInput
      @input="setFormValue($event)"
      v-bind="{
        value: formData.email,
        error: hasInputError('email'),
        validationObject: $v,
        placeholder: 'Email',
        label: 'Email Name',
        name: 'email',
        type: 'text',
        required: true,
      }"
    />
    <CInput
      @input="setFormValue($event)"
      v-bind="{
        value: formData.password,
        error: hasInputError('password'),
        validationObject: $v,
        placeholder: 'Password',
        label: 'Password',
        name: 'password',
        type: 'password',
        required: true,
      }"
    />
    <CInput
      @input="setFormValue($event)"
      v-bind="{
        value: formData.confirmPassword,
        error: hasInputError('confirmPassword'),
        validationObject: $v,
        placeholder: 'Confirm Password',
        label: 'Confirm Password',
        name: 'confirmPassword',
        type: 'password',
        required: true,
      }"
    />
    <div class="signup-form__terms">
      <span
        >By signing up you agree to our
        <a href="https://www.citch.io/en/terms-of-service" target="_blank">terms of service</a> and
        <a href="https://www.citch.io/en/privacy-policy" target="_blank">privacy policy</a></span
      >
    </div>
    <div class="signup-form__submit">
      <CButton
        @click.native="submitSignup"
        v-bind="{ buttonText: 'Register', variant: 'primary', disabled: $v.$invalid }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CInput from '@/components/elements/Input.vue';
import CButton from '@/components/elements/Button.vue';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
import { IValidationObject } from '@/types/forms';

export default Vue.extend({
  name: 'SignupForm',
  components: { CInput, CButton },
  data() {
    return {
      formData: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
      } as { [property: string]: any },
    };
  },
  validations: {
    formData: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    setFormValue(valueObject: { [k: string]: string }) {
      this.formData[valueObject.field] = valueObject.value;
      (this.$v as IValidationObject).formData[valueObject.field].$touch();
    },
    submitSignup() {
      console.log('submit');
    },
    hasInputError(field: string): () => boolean {
      let error =
        (this.$v as IValidationObject).formData[field].$error ||
        (this.$v as IValidationObject).formData[field].$anyError;
      return error;
    },
  },
});
</script>
<style lang="scss" scoped>
.signup-form {
  padding: 20px;
  > .input {
    margin-bottom: 40px;
  }
  &__terms {
    margin-bottom: 20px;
    a {
      font-weight: bold;
      text-decoration: underline;
    }
  }
  &__submit {
    height: 50px;
  }
}
</style>
