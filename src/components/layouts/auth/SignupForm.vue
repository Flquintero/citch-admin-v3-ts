<template>
  <div class="signup-form">
    <CInput
      @input="setFormValue($event)"
      :value="getFormValue('firstName')"
      :error="getFormErrorValue('firstName')"
      placeholder="First Name"
      label="First Name"
      name="firstName"
      type="text"
      required
    />
    <CInput
      @input="setFormValue($event)"
      :value="getFormValue('lastName')"
      placeholder="Last Name"
      label="Last Name"
      name="lastName"
      type="text"
    />
    <CInput
      @input="setFormValue($event)"
      :value="getFormValue('email')"
      placeholder="Email"
      label="Email Name"
      name="email"
      type="text"
    />
    <CInput
      @input="setFormValue($event)"
      :value="getFormValue('password')"
      placeholder="Password"
      label="Password"
      name="password"
      type="password"
    />
    <CInput
      @input="setFormValue($event)"
      :value="getFormValue('confirmPassword')"
      placeholder="Confirm Password"
      label="Confirm Password"
      name="confirmPassword"
      type="password"
    />
    <div class="signup-form__terms">
      <span
        >By signing up you agree to our
        <a href="https://www.citch.io/en/terms-of-service" target="_blank">terms of service</a> and
        <a href="https://www.citch.io/en/privacy-policy" target="_blank">privacy policy</a></span
      >
    </div>
    <div class="signup-form__submit">
      <CButton @click.native="submitSignup" v-bind="{ buttonText: 'Register', variant: 'primary', disabled: true }" />
    </div>
    <!-- <div>{{ $v }}</div> -->
  </div>
</template>

<script lang="ts">
import CInput from '@/components/elements/Input.vue';
import CButton from '@/components/elements/Button.vue';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'SignupForm',
  components: { CInput, CButton },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
    };
  },
  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    email: {
      required,
    },
    password: {
      required,
    },
    confirmPassword: {
      required,
    },
  },
  methods: {
    setFormValue(valueObject: any) {
      this.$data[valueObject.field] = valueObject.value;
      (this.$v as any)[valueObject.field].$touch();
    },
    submitSignup() {
      console.log('submit');
    },
    getFormValue(field: any): () => any {
      return (this.$data as any)[field];
    },
    getFormErrorValue(field: any): () => any {
      let error = (this.$v as any)[field].$error;
      return error;
    },
  },
};
</script>
<style lang="scss" scoped>
.signup-form {
  padding: 20px;
  > .input {
    margin-bottom: 40px;
  }
  &__terms {
    margin-bottom: 20px;
  }
  &__submit {
    height: 50px;
  }
}
</style>
