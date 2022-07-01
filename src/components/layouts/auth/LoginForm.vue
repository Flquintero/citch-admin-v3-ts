<template>
  <div class="login-form">
    <CInput
      @input="setFormValue($event)"
      :value="getFormValue('email')"
      label="Email"
      placeholder="Email"
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
    <div class="login-form__submit">
      <CButton v-bind="{ buttonText: 'Login', variant: 'primary', disabled: !formData }" button-content="Register"
    /></div>
  </div>
</template>

<script lang="ts">
import CInput from '@/components/elements/Input.vue';
import CButton from '@/components/elements/Button.vue';

export default {
  name: 'LoginForm',
  components: { CInput, CButton },
  data() {
    return {
      formData: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    setFormValue(valueObject: { [field: string]: string; value: string }) {
      (this.formData as any)[valueObject.field] = valueObject.value;
    },
    submitSignup() {
      console.log('submit');
    },
    getFormValue(field: string) {
      if (this.formData) return (this.formData as any)[field];
    },
  },
};
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
}
</style>
