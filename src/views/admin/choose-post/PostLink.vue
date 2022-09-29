<template>
  <div class="choose-post-link">
    <div class="choose-post-link__title">
      <h1>Enter the link of the post you want to promote below:</h1></div
    >
    <div class="choose-post-link__input">
      <CInput
        @input="setFormValue(formData, $v, $event)"
        v-bind="{
          value: formData.postUrl,
          error: hasInputError($v, 'postUrl'),
          validationObject: $v,
          placeholder: 'Enter Post Url',
          label: 'Post Url',
          name: 'postUrl',
          description: 'Example: https://www.instagram.com/p/dk30rk', // find a post from citch and add here
          type: 'text',
          required: true,
        }"
    /></div>
    <div class="choose-post-link__confirm">
      <CButton
        @click.native="confirmPostLink"
        v-bind="{ variant: 'primary', disabled: $v.$invalid || saving }"
      >
        <span v-if="saving">
          <font-awesome-icon icon="fa-duotone fa-circle-notch" spin /> Saving to Continue</span
        ><span v-else>Confirm <font-awesome-icon icon="fa-duotone fa-arrow-right" /></span
      ></CButton>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
const CInput = () => import(/* webpackChunkName: "CInput" */ '@/components/elements/Input.vue');
const CButton = () => import(/* webpackChunkName: "CButton" */ '@/components/elements/Button.vue');
import { FormFunctions } from '@/utils/form-functionality';
import { required, url } from 'vuelidate/lib/validators';

export default Vue.extend({
  name: 'PostLink',
  components: { CInput, CButton },
  data() {
    return {
      saving: false,
      formData: {
        postUrl: '',
      },
    };
  },
  validations: {
    formData: {
      postUrl: {
        required,
        url,
      },
    },
  },
  methods: {
    ...FormFunctions,
    async confirmPostLink() {
      try {
        this.saving = true;
        //get platform
        const postPlatform = this.determinePlatform()[0];
        const url = `/builder/${postPlatform}/connect`;
        this.$router.push(url);
      } catch (error: any) {
        console.log('Login error', error);
        this.$alert.error(`Login Error: ${error}`);
      } finally {
        this.saving = false;
      }
    },
    // TO DO: Move to an abstraction, maybe general utils
    determinePlatform() {
      const availablePlatforms = ['facebook', 'instagram'];
      return availablePlatforms.filter((platform: string) => {
        return this.formData.postUrl.includes(platform);
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.choose-post-link {
  text-align: center;
  padding: 50px;
  &__input {
    max-width: 650px;
    margin: 30px auto 50px;
  }
  &__confirm {
    max-width: 200px;
    height: 50px;
    margin: auto;
  }
}
</style>
