<template>
  <div class="reset-password-form">
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

    <div class="reset-password-form__submit">
      <CButton
        @click.native="submitLogin"
        v-bind="{ variant: 'primary', disabled: $v.$invalid || saving }"
      >
        <span v-if="saving">
          <font-awesome-icon icon="fa-duotone fa-circle-notch" spin />Logging You In</span
        ><span v-else>Login</span></CButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CInput from '@/components/elements/Input.vue';
import CButton from '@/components/elements/Button.vue';
import { required, email } from 'vuelidate/lib/validators';
import { FormFunctions } from '@/utils/form-functionality';
import Repository from '@/api-repository/index';
const AuthRepository = Repository.get('auth');

export default Vue.extend({
  name: 'ResetPasswordForm',
  components: { CInput, CButton },
  data() {
    return {
      saving: false,
      formData: {
        email: null,
      } as { [property: string]: string | number | null },
    };
  },
  validations: {
    formData: {
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    ...FormFunctions,
    async submitLogin() {
      try {
        this.saving = true;
        await AuthRepository.loginUser(this.formData);
        this.$router.replace('/home');
      } catch (e: any) {
        console.log('Login error', e);
        this.$alert.error('Login Error:', e);
      } finally {
        this.saving = false;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.reset-password-form {
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
