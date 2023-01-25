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
        <a href="https://www.citch.io/en/terms-of-service" target="_blank"
          >terms of service</a
        >
        and
        <a href="https://www.citch.io/en/privacy-policy" target="_blank"
          >privacy policy</a
        ></span
      >
    </div>
    <div class="signup-form__submit">
      <CButton
        @click.native="submitSignup"
        v-bind="{ variant: 'primary', disabled: $v.$invalid || saving }"
        ><span v-if="saving">
          <font-awesome-icon icon="fa-duotone fa-circle-notch" spin />
          Saving</span
        ><span v-else>Register</span></CButton
      >
    </div>
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
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import { FormFunctions } from "@/utils/form-functionality";
import { User } from "@firebase/auth";
import CurrentUserMixin from "@/mixins/current-user";
import type { IFormData } from "@/types/forms/interfaces";
import type { ITrackData } from "@/types/analytics/interfaces";
const AuthRepository = Vue.prototype.$apiRepository.get("auth");
const UsersRepository = Vue.prototype.$apiRepository.get("users");

export default defineComponent({
  name: "SignupForm",
  components: { CInput, CButton },
  mixins: [CurrentUserMixin],
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
        sameAsPassword: sameAs("password"),
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
        // this.authedUSer in mixin
        // adds user to Authentification Storage not Firestorm DB
        this.authedUser = await AuthRepository.signupUser(this.formattedForm);
        // Will set this.authedUser in mixin we are using
        this.initSetCurrentUser(this.getCurrentUserTrackingInfo());
        // add user to db and does necessary steps to create all thats needed to register
        await UsersRepository.signupUser(this.getSignupPayload());
        this.$router.replace("/");
        this.$alert.success("Welcome!");
      } catch (error: any) {
        console.log("Registration Error", error);
        // To Do: better way to handle this error string
        this.$alert.error(
          `Registration error: ${this.formatRegistrationError(error)}`
        );
      } finally {
        this.saving = false;
      }
    },
    getCurrentUserTrackingInfo() {
      //this.authedUser is in the mixin that we use in this component
      return {
        event: "Signup",
        data: this.getSignupPayload(),
      } as ITrackData;
    },
    getSignupPayload() {
      //this.authedUser comes from mixin
      const authedUser = this.authedUser as User;
      return {
        email: authedUser.email,
        firstName: this.formattedForm?.firstName,
        lastName: this.formattedForm?.lastName,
        emailVerified: authedUser.emailVerified,
        fullName: authedUser.displayName,
      };
    },
    // TO DO: This needs to be addressed the right way
    formatRegistrationError(error: any) {
      let message = error.message;
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        message = "Account already exists";
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
