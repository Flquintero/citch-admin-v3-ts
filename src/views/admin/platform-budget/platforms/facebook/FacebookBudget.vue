<template>
  <div class="facebook-campaign-budget">
    <div v-if="isLoading" class="facebook-campaign-budget__loading">
      <BaseLoader v-bind="{ size: '3x' }" />
    </div>
    <div v-else class="facebook-campaign-budget__content">
      <h3 class="facebook-campaign-budget__content-title">
        {{
          hasBudget
            ? `Budget entered:`
            : `Please enter the budget for this promotion:`
        }}
      </h3>
      <div class="facebook-campaign-budget__content-input">
        <CInput
          @input="setFormValue(formData, $v, $event)"
          v-bind="{
            value: formData.budget,
            error: hasInputError($v, 'budget'),
            validationObject: $v,
            placeholder: `Enter Budget`,
            label: `Campaign Budget`,
            name: 'budget',
            description: '$ US Dollars - Numbers Only',
            type: 'number',
            required: true,
          }"
        />
      </div>
      <div class="facebook-campaign-budget__content-confirm">
        <ContinueButton
          v-if="hasBudget"
          @click.native="confirmBudget"
          v-bind="{
            variant: 'primary',
            disabled: !hasBudget || saving,
            loading: saving,
            textContent: formatContinueButton,
            textIcon: 'fa-arrow-right',
            loadingContent: 'Saving',
          }"
        ></ContinueButton>
        <ResetButton
          v-if="isSavedBudget && isFacebookBudgetUpdated && !saving"
          @click.native="resetChange"
          v-bind="{ textContent: 'Reset Changes' }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { _deepCopy } from "@/utils/formatting";
import { FormFunctions } from "@/utils/form-functionality";
import { required, numeric } from "vuelidate/lib/validators";
import { IFacebookBudget } from "@/types/facebook/campaigns/interfaces";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

const CInput = () =>
  import(
    /* webpackChunkName: "CInput" */ "@/components/elements/BaseInput.vue"
  );

const BaseLoader = () =>
  import(
    /* webpackChunkName: "BaseLoader" */ "@/components/functional/BaseLoader.vue"
  );

const ContinueButton = () =>
  import(
    /* webpackChunkName: "ContinueButton" */ "@/components/functional/ButtonContinue.vue"
  );

const ResetButton = () =>
  import(
    /* webpackChunkName: "ResetButton" */ "@/components/functional/ButtonReset.vue"
  );

export default defineComponent({
  name: "FacebookBudget",
  components: { BaseLoader, ContinueButton, ResetButton, CInput },
  data() {
    return {
      saving: false,
      isLoading: false,
      formData: {
        budget: null as number | null,
      },
      savedBudget: {
        budget: null as number | null,
      },
    };
  },
  validations: {
    formData: {
      budget: {
        required,
        numeric,
      },
    },
  },
  async created() {
    await this.getSavedCampaignBudget();
  },
  methods: {
    ...mapActions("Facebook", [
      "setCurrentFacebookBudget",
      "setSavedFacebookBudget",
    ]),
    ...FormFunctions,
    async confirmBudget() {
      if (this.isSavedBudget && !this.isFacebookBudgetUpdated) {
        await this.continueNextStep();
        return;
      }
      try {
        this.saving = true;
        const saveCampaignObject = {
          campaignId: this.$route.query.campaignId,
          campaignBudget: this.formData,
        };
        if (this.isSavedBudget) {
          await FacebookRepository.updateCampaignBudget({
            saveCampaignObject,
          });
        } else {
          await FacebookRepository.saveCampaignBudget({
            saveCampaignObject,
          });
        }
        await this.setSavedFacebookBudget(this.formData);
        this.$alert.success(`Budget Saved`);
      } catch (error: any) {
        this.$alert.error(`Error Saving Budget`);
      } finally {
        this.saving = false;
      }
    },
    // TO DO: could be abstracted
    async continueNextStep() {
      await this.$router.push({
        name: "platform publish",
        params: this.$route.params,
        query: {
          ...this.$route.query,
        },
      });
    },
    async resetChange() {
      await this.getSavedCampaignBudget();
    },
    async getSavedCampaignBudget() {
      try {
        this.isLoading = true;
        const facebookCampaignBudget =
          await FacebookRepository.getCampaignBudget(
            this.$route.query.campaignId as string
          );
        await this.setSavedFacebookBudget(facebookCampaignBudget);
      } catch (error: any) {
        console.log("Get Facebook Campaign Budget Error", error);
      } finally {
        this.isLoading = false;
      }
    },
    setSavedBudget() {
      this.savedBudget = _deepCopy(this.savedFacebookBudget);
      this.formData = _deepCopy(this.savedFacebookBudget);
    },
  },
  computed: {
    ...mapGetters("Facebook", ["savedFacebookBudget"]),
    hasBudget(): boolean {
      return !!this.formData.budget;
    },
    isSavedBudget(): boolean {
      return !!this.savedFacebookBudget;
    },
    formatContinueButton() {
      let renderButtonContent = "Confirm Budget";
      if (this.isSavedBudget) {
        if (!this.isFacebookBudgetUpdated) {
          renderButtonContent = "Continue";
        } else {
          renderButtonContent = "Save Change";
        }
      }
      return renderButtonContent;
    },

    isFacebookBudgetUpdated(): boolean {
      if (this.isSavedBudget) {
        return this.formData.budget !== this.savedBudget.budget;
      }
      return false;
    },
  },
  watch: {
    savedFacebookBudget(savedBudget?: IFacebookBudget) {
      if (savedBudget) this.setSavedBudget();
    },
  },
});
</script>
<style lang="scss">
.facebook-campaign-budget {
  @include view-web-gutter();
  @include mobile() {
    @include view-mobile-gutter();
  }
  &__loading {
    @include center-with-margin($max-width: 800px);
    @include flex-config($justify-content: center, $align-items: center);
    height: 200px;
    color: $secondary;
  }
  &__content {
    &-title {
      @include center-with-margin($max-width: 600px, $top: 40px);
      text-align: center;
    }
    &-input {
      @include center-with-margin($max-width: 600px, $top: 40px);
    }
    &-confirm {
      @include center-with-margin($max-width: 350px, $top: 45px, $bottom: 40px);
    }
    &-post {
      @include flex-config($justify-content: center);
    }
  }
  &__reset-btn {
    margin: 20px 0;
    max-width: 100%;
    height: 50px !important;
  }
}
</style>
