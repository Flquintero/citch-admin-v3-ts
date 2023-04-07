<template>
  <div class="facebook-campaign-date">
    <div class="facebook-campaign-date__content">
      <div class="facebook-campaign-date__content-inputs">
        <DateSelectSingle
          v-bind="{
            inputPlacehoder: 'Choose Start',
            inputLabel: 'Start Date and Time',
            inputRequired: true,
            customConfigurations: {
              ...(this.formData.endTime
                ? {
                    maxDate: this.formData.endTime,
                  }
                : null),
            },
          }"
          @on-change="setStartTime($event)"
        />
        <div class="facebook-campaign-date__content-inputs-separator">
          <div><span>To</span></div>
        </div>
        <DateSelectSingle
          v-bind="{
            inputPlacehoder: 'Choose End',
            inputLabel: 'End Date and Time',
            inputRequired: true,
            customConfigurations: {
              ...(this.formData.startTime
                ? {
                    minDate: this.formData.startTime,
                  }
                : null),
            },
          }"
          @on-change="setEndTime($event)"
        />
      </div>
      <div class="facebook-campaign-date__content-confirm">
        <ContinueButton
          v-if="hasDates"
          @click.native="confirmDate"
          v-bind="{
            variant: 'primary',
            disabled: !hasDates || saving,
            loading: saving,
            textContent: formatContinueButton,
            textIcon: 'fa-arrow-right',
            loadingContent: 'Saving to Continue',
          }"
        ></ContinueButton>
        <ResetButton
          v-if="isSavedObjectiveGoal && !isSameObjectiveGoal && !saving"
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
import { defineComponent } from "vue";
import { dateTimePickerPresets } from "@/utils/date-time-picker-options";

dayjs.extend(utc);

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
  name: "FacebookDate",
  components: { ContinueButton, ResetButton, DateSelectSingle },
  data() {
    return {
      dateTimePickerPresets,
      saving: false,
      formData: {
        startTime: null as Date | null,
        endTime: null as Date | null,
      },
    };
  },
  methods: {
    setStartTime(date: Date) {
      this.formData.startTime = dayjs(date).toDate();
    },
    setEndTime(date: Date) {
      this.formData.endTime = dayjs(date).toDate();
    },
    setSavedValue() {
      console.log("reset");
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
    // TO DO: could be abstracted
    async continueNextStep() {
      await this.$router.push({
        name: "platform audience",
        params: this.$route.params,
        query: {
          ...this.$route.query,
        },
      });
    },
    resetChange() {
      this.setSavedValue();
    },
  },
  computed: {
    hasDates() {
      return this.formData.endTime && this.formData.startTime;
    },
    formatContinueButton() {
      let renderButtonContent = "Confirm Date";
      if (this.isSavedObjectiveGoal) {
        if (this.isSameObjectiveGoal) {
          renderButtonContent = "Continue";
        } else {
          renderButtonContent = "Save Change";
        }
      }
      return renderButtonContent;
    },
  },
});
</script>
<style lang="scss">
.facebook-campaign-date {
  @include view-web-gutter();
  @include mobile() {
    @include view-mobile-gutter();
  }
  &__content {
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
