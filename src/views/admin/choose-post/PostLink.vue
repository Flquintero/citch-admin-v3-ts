<template>
  <div class="choose-post-link">
    <div class="choose-post-link__title">
      <h1>Enter the link of the post you want to promote below:</h1>
    </div>
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
      />
    </div>
    <div class="choose-post-link__confirm">
      <ContinueButton
        @click.native="confirmPostLink"
        v-bind="{
          variant: 'primary',
          disabled: $v.$invalid || saving,
          loading: saving,
          textContent: 'Confirm',
          textIcon: 'fa-arrow-right',
          loadingContent: 'Saving to Continue',
        }"
      ></ContinueButton>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
const CInput = () =>
  import(
    /* webpackChunkName: "CInput" */ "@/components/elements/BaseInput.vue"
  );
const ContinueButton = () =>
  import(
    /* webpackChunkName: "ContinueButton" */ "@/components/functional/ContinueButton.vue"
  );
import { FormFunctions } from "@/utils/form-functionality";
import { required, url } from "vuelidate/lib/validators";

export default defineComponent({
  name: "PostLink",
  components: { CInput, ContinueButton },
  data() {
    return {
      saving: false,
      formData: {
        postUrl: "",
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
        const postPlatform = this.determinePlatform();
        const url = `/builder/${postPlatform}/connect?post=${this.formData.postUrl}`;
        this.$router.push(url);
      } catch (error: any) {
        console.log("Login error", error);
        this.$alert.error(`Login Error: ${error}`);
      } finally {
        this.saving = false;
      }
    },
    // TO DO: Move to an abstraction, maybe general utils
    determinePlatform() {
      const availablePlatforms = [
        { variation: "facebook", platform: "facebook" },
        { variation: "fb", platform: "facebook" }, //some urls have fb instead of facebook
        { variation: "instagram", platform: "instagram" },
      ];
      return availablePlatforms.filter(
        (platformOptions: { [property: string]: string }) => {
          return this.formData.postUrl.includes(platformOptions.variation);
        }
      )[0].platform;
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
    margin: auto;
  }
}
</style>
