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
        ><span v-else>Register</span></CButton
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
import { IFormData } from '@/types/forms';
import { User } from '@firebase/auth';
const AuthRepository = Repository.get('auth');
const UsersRepository = Repository.get('users');
const OrganizationsRepository = Repository.get('organizations');

export default Vue.extend({
  name: 'SignupForm',
  components: { CInput, CButton },
  data() {
    return {
      saving: false,
      formattedForm: null as IFormData | null,
      formData: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
      } as IFormData,
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
        // Make sure email and names are lower cased and trimmed. If any changes to form we do it through the function
        this.formattedForm = FormFunctions.formatFormData(this.formData);
        await AuthRepository.signupUser(this.formattedForm);
        // gets the user back, because firebase doesnt have another way
        let authedUser = await AuthRepository.observerCurrentAuthedUser();
        // add user to db
        let createdUser = await UsersRepository.createUser(this.getSignupPayload(authedUser));
        //create org with user
        let createdOrganization = await OrganizationsRepository.createOrganization(
          this.getOrganizationPayload(authedUser, createdUser._path.segments)
        );
        console.log('createdOrg', createdOrganization);
        // update user with saved org
        // await UsersRepository.updateUser(createdOrganization);
        this.$router.replace('/home');
        this.$alert.success('Welcome!');
      } catch (error: any) {
        console.log('Registration Error', error);
        // To Do: better way to handle this error string
        this.$alert.error(`Registration error: ${this.formatRegistrationError(error)}`);
      } finally {
        this.saving = false;
      }
    },
    getSignupPayload(authedUser: User) {
      return {
        email: authedUser.email,
        firstName: this.formattedForm?.firstName,
        lastName: this.formattedForm?.lastName,
        emailVerified: authedUser.emailVerified,
        fullName: authedUser.displayName,
        uid: authedUser.uid,
        providerId: authedUser.providerId,
        type: 'OWNER',
        enabled: 'false',
      };
    },
    getOrganizationPayload(authedUser: User, userPathArray: string[]) {
      return {
        email: authedUser.email,
        fullName: authedUser.displayName,
        enabled: 'false',
        owner: `${userPathArray.join('/')}`,
      };
    },
    formatRegistrationError(error: any) {
      let message = error.message;
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        message = 'Account already exists';
      }
      return message;
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
