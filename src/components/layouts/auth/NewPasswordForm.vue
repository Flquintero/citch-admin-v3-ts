<template>
  <div class="new-password-form">
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
    <div class="new-password-form__submit">
      <CButton
        @click.native="submitNewPassword"
        v-bind="{ variant: 'primary', disabled: $v.$invalid || saving }"
        ><span v-if="saving">
          <font-awesome-icon icon="fa-duotone fa-circle-notch" spin /> Saving</span
        ><span>Set New Password</span></CButton
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
  name: 'NewPasswordForm',
  components: { CInput, CButton },
  data() {
    return {
      saving: false,
      formData: {
        password: null,
        confirmPassword: null,
      } as { [property: string]: string | number | null },
    };
  },
  validations: {
    formData: {
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
    async submitNewPassword() {
      try {
        this.saving = true;
        await AuthRepository.setNewPassword(this.formData);
        this.$router.replace('/login');
        this.$alert.success('Password Reset. Please log in again.');
      } catch (error: any) {
        console.log('Reset Password Error', error);
        this.$alert.error('Reset Password Error:', error);
      } finally {
        this.saving = false;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.new-password-form {
  padding: 20px;
  > .input {
    margin-bottom: 40px;
  }

  &__submit {
    height: 50px;
  }
}
</style>
