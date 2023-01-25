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
        @click.native="submitReset"
        v-bind="{ variant: 'primary', disabled: $v.$invalid || saving }"
      >
        <span v-if="saving">
          <font-awesome-icon icon="fa-duotone fa-circle-notch" spin />
          Sending</span
        ><span v-else>Send Reset Password Email</span></CButton
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
import { required, email } from "vuelidate/lib/validators";
import { FormFunctions } from "@/utils/form-functionality";
import type { IFormData } from "@/types/forms/interfaces";
const AuthRepository = Vue.prototype.$apiRepository.get("auth");

export default defineComponent({
  name: "ResetPasswordForm",
  components: { CInput, CButton },
  data() {
    return {
      saving: false,
      formData: {
        email: null,
      } as IFormData,
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
    async submitReset() {
      try {
        this.saving = true;
        await AuthRepository.initResetUserPassword(this.formData);
        this.$alert.success("Email Sent! Please look in Inbox for Reset Link!");
      } catch (e: any) {
        console.log("Send Reset Email error", e);
        this.$alert.error("Send Reset Email Error:", e);
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
