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
    <div class="login-form__reset-password">
      <router-link to="/reset-password">Forgot Password?</router-link>
    </div>
    <div class="login-form__submit">
      <CButton
        @click.native="submitLogin"
        v-bind="{ variant: 'primary', disabled: $v.$invalid || saving }"
      >
        <span v-if="saving">
          <font-awesome-icon icon="fa-duotone fa-circle-notch" spin /> Logging You In</span
        ><span v-else>Login</span></CButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const CInput = () => import(/* webpackChunkName: "CInput" */ '@/components/elements/Input.vue');
const CButton = () => import(/* webpackChunkName: "CButton" */ '@/components/elements/Button.vue');
import { required } from 'vuelidate/lib/validators';
import { FormFunctions } from '@/utils/form-functionality';
import Repository from '@/api-repository/index';
import { IFormData } from '@/types/forms';
import { User } from '@firebase/auth';
const AuthRepository = Repository.get('auth');

export default Vue.extend({
  name: 'LoginForm',
  components: { CInput, CButton },
  data() {
    return {
      saving: false,
      formData: {
        email: null,
        password: null,
      } as IFormData,
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
    async submitLogin() {
      try {
        this.saving = true;
        await AuthRepository.loginUser(FormFunctions.formatFormData(this.formData));
        const autherUser = await AuthRepository.observerCurrentAuthedUser();
        this.$router.replace('/home');
        this.setAnalyticsUser(autherUser);
      } catch (error: any) {
        console.log('Login error', error);
        // To Do: better way to handle this error string
        this.$alert.error(`Login Error: ${this.formatLoginError(error)}`);
      } finally {
        this.saving = false;
      }
    },
    setAnalyticsUser(authedUser: User) {
      this.$analyticsFunctions.identify({
        id: authedUser.uid,
      });
      this.$analyticsFunctions.track({ event: 'Login', data: { email: this.formData.email } });
    },
    formatLoginError(error: any) {
      let message = error.message;
      if (
        error.message === 'Firebase: Error (auth/wrong-password).' ||
        error.message === 'Firebase: Error (auth/user-not-found).'
      ) {
        message = 'Invalid Username Or Password';
      }
      return message;
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
  &__reset-password {
    width: 100%;
    text-align: right;
    margin-bottom: 40px;
  }
}
</style>
