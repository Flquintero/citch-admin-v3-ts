<template>
  <div class="signup-form">
    <CInput
      @input="setFormValue(formData, $v, $event)"
      v-bind="{
        value: formData.firstName,
        error: hasInputError($v, 'firstName'),
        validationObject: $v,
        placeholder: 'First Name',
        label: 'First Name',
        name: 'firstName',
        type: 'text',
        required: true,
      }"
    />
    <CInput
      @input="setFormValue(formData, $v, $event)"
      v-bind="{
        value: formData.lastName,
        error: hasInputError($v, 'lastName'),
        validationObject: $v,
        placeholder: 'Last Name',
        label: 'Last Name',
        name: 'lastName',
        type: 'text',
        required: true,
      }"
    />
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
    <CInput
      @input="setFormValue(formData, $v, $event)"
      v-bind="{
        value: formData.confirmPassword,
        error: hasInputError($v, 'confirmPassword'),
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
        v-bind="{ variant: 'primary', disabled: $v.$invalid || saving }"
        ><span v-if="saving">
          <font-awesome-icon icon="fa-duotone fa-circle-notch" spin /> Saving</span
        ><span>Register</span></CButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CInput from '@/components/elements/Input.vue';
import CButton from '@/components/elements/Button.vue';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
import { FormFunctions } from '@/utils/form-functionality';
import Repository from '@/api-repository/index';
const AuthRepository = Repository.get('auth');

export default Vue.extend({
  name: 'SignupForm',
  components: { CInput, CButton },
  data() {
    return {
      saving: false,
      formData: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
      } as { [property: string]: string | number | null },
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
    ...FormFunctions,
    async submitSignup() {
      try {
        this.saving = true;
        await AuthRepository.signupUser(this.formData);
        this.$router.replace('/home');
        this.$alert.success('Welcome!');
      } catch (error: any) {
        console.log('Registration Error', error);
        this.$alert.error('Registration error:', error);
      } finally {
        this.saving = false;
      }
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
    margin-bottom: 30px;
  }
  &__submit {
    height: 50px;
  }
}
</style>
