<template>
  <div class="new-password-form">
    <CInput
      @input="setFormValue(formData, $v, $event)"
      v-bind="{
        value: formData.newPassword,
        error: hasInputError($v, 'newPassword'),
        validationObject: $v,
        placeholder: 'New Password',
        label: 'New Password',
        name: 'newPassword',
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
        placeholder: 'Confirm New Password',
        label: 'Confirm New Password',
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
          <font-awesome-icon icon="fa-duotone fa-circle-notch" spin />
          Saving</span
        ><span v-else>Set New Password</span></CButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
const CInput = () =>
  import(/* webpackChunkName: "CInput" */ "@/components/elements/Input.vue");
const CButton = () =>
  import(/* webpackChunkName: "CButton" */ "@/components/elements/Button.vue");
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import { FormFunctions } from "@/utils/form-functionality";
const AuthRepository = Vue.prototype.$apiRepository.get("auth");

export default Vue.extend({
  name: "NewPasswordForm",
  components: { CInput, CButton },
  data() {
    return {
      saving: false,
      formData: {
        newPassword: null,
        confirmPassword: null,
      } as { [property: string]: string | number | null },
    };
  },
  validations: {
    formData: {
      newPassword: {
        required,
        minLength: minLength(6),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("newPassword"),
      },
    },
  },
  methods: {
    ...FormFunctions,
    async submitNewPassword() {
      try {
        this.saving = true;
        this.formData.oobCode = this.$route.query.oobCode as string;
        this.formData.apiKey = this.$route.query.apiKey as string;
        if (!this.formData.oobCode || !this.formData.apiKey) {
          this.$alert.error(
            "Error ocurred please restart Reset Password again"
          );
          this.$router.replace("/login");
        }
        await AuthRepository.setNewPassword(this.formData);
        this.$router.replace("/login");
        this.$alert.success("Password Reset. Please log in again.");
      } catch (error: any) {
        console.log("Reset Password Error", error);
        this.$alert.error(`Reset Password Error: ${error.message}`);
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
