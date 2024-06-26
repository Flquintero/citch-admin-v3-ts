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
        v-if="formData.postUrl"
        @click.native="confirmPostLink"
        v-bind="{
          variant: 'primary',
          disabled: $v.$invalid || saving,
          loading: saving,
          textContent: 'Confirm',
          textIcon: 'fa-arrow-right',
          loadingContent: 'Saving',
        }"
      ></ContinueButton>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
const CInput = () =>
  import(
    /* webpackChunkName: "CInput" */ "@/components/elements/BaseInput.vue"
  );
const ContinueButton = () =>
  import(
    /* webpackChunkName: "ContinueButton" */ "@/components/functional/ButtonContinue.vue"
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
  created() {
    this.resetPlatformStates();
  },
  methods: {
    ...mapActions("Facebook", ["resetAllFacebookState"]),
    ...FormFunctions,
    resetPlatformStates() {
      // TO DO: Need to be able to have a more scalable way for multiple platforms
      this.resetAllFacebookState();
    },
    async confirmPostLink() {
      try {
        this.saving = true;
        //get platform
        const postPlatform = this.determinePlatform();
        this.checkPostFormat(postPlatform);
        const url = `/builder/${postPlatform}/connect?post=${this.formData.postUrl}`;
        this.$router.push(url);
      } catch (error: any) {
        console.log("Login error", error);
        this.$alert.error(`Login Error: ${error}`);
      } finally {
        this.saving = false;
      }
    },
    checkPostFormat(platform: string) {
      switch (platform) {
        case "instagram": {
          // abstract this in future - we need to make sure
          const reelMatch = new RegExp(/reel/);
          const hasReel = this.formData.postUrl.match(reelMatch);
          if (hasReel) {
            this.formData.postUrl = this.formData.postUrl.replace("reel", "p");
          }
          const queryMatch = new RegExp(/\?/);
          const hasQuery = this.formData.postUrl.match(queryMatch);
          if (hasQuery) {
            this.formData.postUrl = this.formData.postUrl.split("?")[0];
          }
          break;
        }
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
