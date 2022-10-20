<template>
  <div class="objective-goal">
    <h1 class="objective-goal__title"
      >How many
      <SelectedContent
        v-bind="{
          content: $route.query.objective,
          capitalize: true,
          url: `objective`,
          addQueryParams: true,
        }"
      />
      are you looking to generate for your
      <SelectedContent
        v-bind="{ content: $route.params.platform, capitalize: true, url: '/post-link' }"
      />
      post?</h1
    >
    <h1 class="objective-goal__title"
      >How many people are you looking to
      <SelectedContent
        v-bind="{
          content: $route.query.objective,
          capitalize: true,
          url: `objective`,
          addQueryParams: true,
        }"
      />
      with your
      <SelectedContent
        v-bind="{ content: $route.params.platform, capitalize: true, url: '/post-link' }"
      />
      post?</h1
    >
    <div class="objective-goal__content">
      <div class="objective-goal__content-input">
        <CInput
          @input="setFormValue(formData, $v, $event)"
          v-bind="{
            value: formData.objectiveGoal,
            error: hasInputError($v, 'objectiveGoal'),
            validationObject: $v,
            placeholder: `Enter Number of ${savedObjective}`,
            label: `${savedObjective} Goal`,
            name: 'objectiveGoal',
            description: 'Enter Numbers Only',
            type: 'number',
            required: true,
          }"
      /></div>
      <div class="objective-goal__content-confirm">
        <Continue
          @click.native="confirmObjectiveGoal"
          v-bind="{
            variant: 'primary',
            disabled: $v.$invalid || saving,
            loading: saving,
            textContent: formatContinueButton,
            textIcon: 'fa-arrow-right',
            loadingContent: 'Saving to Continue',
          }"
        ></Continue>
      </div>
      <div class="objective-goal__content-post">
        <component :is="getPlatformPost($route.params.platform)"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const CInput = () => import(/* webpackChunkName: "CInput" */ '@/components/elements/Input.vue');
const Continue = () =>
  import(/* webpackChunkName: "Continue" */ '@/components/functional/Continue.vue');
import { FormFunctions } from '@/utils/form-functionality';
import { required, numeric } from 'vuelidate/lib/validators';
import { getPlatformPost } from '@/components/functional/social-post/post-component-loader';
import SelectedContent from '@/components/functional/SelectedContent.vue';

export default Vue.extend({
  name: 'ObjectiveNumbers',
  components: { SelectedContent, CInput, Continue },
  data() {
    return {
      saving: false,
      formData: {
        objectiveGoal: null as number | null,
      },
    };
  },
  validations: {
    formData: {
      objectiveGoal: {
        required,
        numeric,
      },
    },
  },
  mounted() {
    this.checkExistingObjectiveGoal();
  },
  methods: {
    ...FormFunctions,
    getPlatformPost,
    checkExistingObjectiveGoal() {
      if (this.isSavedObjectiveGoal) this.formData.objectiveGoal = this.savedObjectiveGoal;
    },
    async confirmObjectiveGoal() {
      try {
        this.saving = true;
        await this.continueNextStep();
      } catch (error: any) {
        this.$alert.error(`Error Saving Objective: ${error}`);
      } finally {
        this.saving = false;
      }
    },
    async continueNextStep() {
      await this.$router.push({
        name: 'platform audience',
        params: this.$route.params,
        query: {
          ...this.$route.query,
          objectiveGoal: this.formData.objectiveGoal?.toString(),
        },
      });
    },
  },
  computed: {
    isSavedObjectiveGoal() {
      return !!this.$route.query.objectiveGoal;
    },
    savedObjectiveGoal() {
      return parseInt(this.$route.query.objectiveGoal as string);
    },
    savedObjective() {
      return this.$route.query.objective;
    },
    isSameObjectiveGoal() {
      return this.$route.query.objectiveGoal === this.$data.formData.objectiveGoal?.toString();
    },
    formatContinueButton() {
      let renderButtonContent = 'Confirm Goal';
      if (this.isSavedObjectiveGoal) {
        if (this.isSameObjectiveGoal) {
          renderButtonContent = 'Continue';
        } else {
          renderButtonContent = 'Save Change';
        }
      }
      return renderButtonContent;
    },
  },
});
</script>
<style lang="scss" scoped>
.objective-goal {
  @include view-web-gutter();
  @include mobile() {
    @include view-mobile-gutter();
  }
  &__title {
    text-align: center;
  }
  &__content {
    &-input {
      @include center-with-margin($max-width: 300px, $top: 40px);
    }
    &-confirm {
      @include center-with-margin($max-width: 350px, $top: 45px, $bottom: 40px);
    }
    &-post {
      @include flex-config($justify-content: center);
    }
  }
}
</style>
