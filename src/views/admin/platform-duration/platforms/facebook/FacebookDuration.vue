<template>
  <div class="facebook-campaign-duration">
    <div v-if="isLoading" class="facebook-campaign-duration__loading">
      <BaseLoader v-bind="{ size: '3x' }" />
    </div>
    <div v-else class="facebook-campaign-duration__content">
      <h3 class="facebook-campaign-duration__content-title">
        {{
          hasDates
            ? `Dates selected:`
            : `Please select the start and end date for this promotion:`
        }}
      </h3>
      <div class="facebook-campaign-duration__content-inputs">
        <DateSelectSingle
          v-bind="{
            savedValue: savedDuration.startDate,
            inputPlacehoder: 'Choose Start',
            inputLabel: 'Start Date and Time',
            inputRequired: true,
            customConfigurations: {
              ...(formData.endDate
                ? {
                    maxDate: formattedMaxDateLimit,
                  }
                : null),
            },
          }"
          @on-change="setStartDate($event)"
        />
        <div class="facebook-campaign-duration__content-inputs-separator">
          <div><span>To</span></div>
        </div>
        <DateSelectSingle
          v-bind="{
            savedValue: savedDuration.endDate,
            inputPlacehoder: 'Choose End',
            inputLabel: 'End Date and Time',
            inputRequired: true,
            customConfigurations: {
              ...(formData.startDate
                ? {
                    minDate: formattedMinDateLimit,
                  }
                : null),
            },
          }"
          @on-change="setEndDate($event)"
        />
      </div>
      <div class="facebook-campaign-duration__content-confirm">
        <ContinueButton
          v-if="hasDates"
          @click.native="confirmDate"
          v-bind="{
            variant: 'primary',
            disabled: !hasDates || saving,
            loading: saving,
            textContent: formatContinueButton,
            textIcon: 'fa-arrow-right',
            loadingContent: 'Saving',
          }"
        ></ContinueButton>
        <ResetButton
          v-if="isSavedDuration && isFacebookDurationUpdated"
          @click.native="resetChange"
          v-bind="{ textContent: 'Reset Change' }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Vue, { defineComponent } from "vue";
import { dateTimePickerPresets } from "@/utils/date-time-picker-options";
import { mapActions, mapGetters } from "vuex";
import { _deepCopy } from "@/utils/formatting";
import { IFacebookDuration } from "@/types/facebook/campaigns/interfaces";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

dayjs.extend(utc);

const BaseLoader = () =>
  import(
    /* webpackChunkName: "BaseLoader" */ "@/components/functional/BaseLoader.vue"
  );

const ContinueButton = () =>
  import(
    /* webpackChunkName: "ContinueButton" */ "@/components/functional/ButtonContinue.vue"
  );

const DateSelectSingle = () =>
  import(
    /* webpackChunkName: "DateSelectSingle" */ "@/components/functional/DateSelectSingle.vue"
  );

const ResetButton = () =>
  import(
    /* webpackChunkName: "ResetButton" */ "@/components/functional/ButtonReset.vue"
  );

export default defineComponent({
  name: "FacebookDuration",
  components: { BaseLoader, ContinueButton, ResetButton, DateSelectSingle },
  data() {
    return {
      dateTimePickerPresets,
      saving: false,
      isLoading: false,
      // isFacebookDurationUpdated: false,
      formData: {
        startDate: null as any | null,
        endDate: null as any | null,
      },
      savedDuration: {
        startDate: null as any | null,
        endDate: null as any | null,
      },
    };
  },
  async created() {
    await this.getSavedCampaignDuration();
  },
  methods: {
    ...mapActions("Facebook", [
      "setCurrentFacebookDuration",
      "setSavedFacebookDuration",
    ]),
    setStartDate(date: Date) {
      this.formData.startDate = dayjs(date).toISOString();
      // this.checkUpdatedDuration();
    },
    setEndDate(date: Date) {
      this.formData.endDate = dayjs(date).toISOString();
      // this.checkUpdatedDuration();
    },
    // checkUpdatedDuration() {
    //   const isStartDateSame =
    //     dayjs(this.formData.startDate).unix() ===
    //     dayjs(this.savedDuration.startDate).unix();
    //   const isEndDateSame =
    //     dayjs(this.formData.endDate).unix() ===
    //     dayjs(this.savedDuration.endDate).unix();
    //   this.isFacebookDurationUpdated = !(isStartDateSame && isEndDateSame);
    // },
    updateCurrentDuration() {
      this.setCurrentFacebookDuration(this.formData);
    },
    async confirmDate() {
      if (this.isSavedDuration && !this.isFacebookDurationUpdated) {
        await this.continueNextStep();
        return;
      }
      try {
        this.saving = true;
        const saveCampaignObject = {
          campaignId: this.$route.query.campaignId,
          campaignDates: this.formData,
        };
        if (this.savedFacebookDuration) {
          await FacebookRepository.updateCampaignDuration({
            saveCampaignObject,
          });
        } else {
          await FacebookRepository.saveCampaignDuration({
            saveCampaignObject,
          });
        }
        // await this.setSavedFacebookAudience(
        //   _deepCopy(this.currentFacebookAudience)
        // );
        this.$alert.success(`Date Saved`);
      } catch (error: any) {
        this.$alert.error(`Error Saving Date`);
      } finally {
        this.saving = false;
      }
    },
    // TO DO: could be abstracted
    async continueNextStep() {
      await this.$router.push({
        name: "platform budget",
        params: this.$route.params,
        query: {
          ...this.$route.query,
        },
      });
    },
    async resetChange() {
      await this.getSavedCampaignDuration();
    },
    async getSavedCampaignDuration() {
      try {
        this.isLoading = true;
        const facebookCampaignDuration =
          await FacebookRepository.getCampaignDuration(
            this.$route.query.campaignId as string
          );
        await this.setSavedFacebookDuration(facebookCampaignDuration);
      } catch (error: any) {
        console.log("Get Facebook Campaign Duration Error", error);
      } finally {
        this.isLoading = false;
      }
    },
    setSavedDuration() {
      const { endDate, startDate } = _deepCopy(this.savedFacebookDuration);
      if (endDate && startDate) {
        this.savedDuration = {
          endDate: endDate,
          startDate: startDate,
        };
      }
    },
  },
  computed: {
    ...mapGetters("Facebook", ["savedFacebookDuration"]),
    hasDates() {
      return this.formData.endDate && this.formData.startDate;
    },
    isSavedDuration(): boolean {
      return !!this.savedFacebookDuration;
    },
    formatContinueButton() {
      let renderButtonContent = "Confirm Dates";
      if (this.isSavedDuration) {
        if (!this.isFacebookDurationUpdated) {
          renderButtonContent = "Continue";
        } else {
          renderButtonContent = "Save Change";
        }
      }
      return renderButtonContent;
    },
    formattedMinDateLimit(): string {
      return this.formData.startDate;
    },
    formattedMaxDateLimit(): string {
      return this.formData.endDate;
    },
    isFacebookDurationUpdated(): boolean {
      const isStartDateSame =
        dayjs(this.formData.startDate).unix() ===
        dayjs(this.savedDuration.startDate).unix();
      const isEndDateSame =
        dayjs(this.formData.endDate).unix() ===
        dayjs(this.savedDuration.endDate).unix();
      return !(isStartDateSame && isEndDateSame);
    },
  },
  watch: {
    savedFacebookDuration(savedDuration?: IFacebookDuration) {
      if (savedDuration) this.setSavedDuration();
    },
  },
});
</script>
<style lang="scss">
.facebook-campaign-duration {
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
    &-inputs {
      @include center-with-margin($max-width: 300px, $top: 40px);
      @include flex-config($justify-content: center);
      &-separator {
        @include flex-config($align-items: center, $justify-content: center);
        margin: 0 10px;
      }
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
