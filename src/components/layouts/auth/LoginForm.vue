<template>
  <div class="login-form">
    <CInput
      @input="setFormValue($event)"
      v-bind="{
        value: formData.email,
        label: 'Email',
        placeholder: 'Email',
        name: 'email',
        type: 'text',
      }"
    />
    <CInput
      @input="setFormValue($event)"
      v-bind="{
        value: formData.password,
        label: 'Password',
        placeholder: 'Password',
        name: 'password',
        type: 'password',
      }"
    />
    <div class="login-form__submit">
      <CButton v-bind="{ buttonText: 'Login', variant: 'primary', disabled: !formData }"
    /></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CInput from '@/components/elements/Input.vue';
import CButton from '@/components/elements/Button.vue';

export default Vue.extend({
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
    // getFormValue(field: string) {
    //   return (this.formData as any)[field];
    // },
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
}
</style>
