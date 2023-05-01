<template>
  <div class="objective-goal">
    <div class="objective-goal__content">
      <div class="objective-goal__content-input">
        <CInput
          @input="setFormValue(formData, $v, $event)"
          v-bind="{
            value: formData.objectiveGoal,
            error: hasInputError($v, 'objectiveGoal'),
            validationObject: $v,
            placeholder: `Enter Number of ${savedObjectiveDisplayName}`,
            label: `${savedObjectiveDisplayName} Goal`,
            name: 'objectiveGoal',
            description: 'Enter Numbers Only',
            type: 'number',
            required: true,
          }"
        />
      </div>
      <div class="objective-goal__content-confirm">
        <ContinueButton
          @click.native="confirmObjectiveGoal"
          v-bind="{
            variant: 'primary',
            disabled: $v.$invalid || saving,
            loading: saving,
            textContent: formatContinueButton,
            textIcon: 'fa-arrow-right',
            loadingContent: 'Saving',
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
import { defineComponent } from "vue";
import { FormFunctions } from "@/utils/form-functionality";
import { required, numeric } from "vuelidate/lib/validators";
import { EFacebookObjectiveIdentifier } from "@/types/facebook/campaigns/enums";
import type { IFacebookObjective } from "@/types/facebook/campaigns/interfaces";
import { getFacebookObjectiveByIdentifier } from "../../../platform-objective/platforms/facebook/utils/facebook-objective-identifier-parser";
const CInput = () =>
  import(
    /* webpackChunkName: "CInput" */ "@/components/elements/BaseInput.vue"
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
  name: "FacebookObjectiveGoal",
  components: { CInput, ContinueButton, ResetButton },
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
    checkExistingObjectiveGoal() {
      if (this.isSavedObjectiveGoal) this.setSavedValue();
    },
    setSavedValue() {
      this.formData.objectiveGoal = this.savedObjectiveGoal;
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
          objectiveGoal: this.formData.objectiveGoal?.toString(),
        },
      });
    },
    resetChange() {
      this.setSavedValue();
    },
  },
  computed: {
    isSavedObjectiveGoal(): boolean {
      return !!this.$route.query.objectiveGoal;
    },
    savedObjectiveGoal(): number {
      return parseInt(this.$route.query.objectiveGoal as string);
    },
    savedObjectiveIdentifier(): EFacebookObjectiveIdentifier {
      return parseInt(this.$route.query.objective as string);
    },
    savedObjective(): IFacebookObjective {
      return getFacebookObjectiveByIdentifier(this.savedObjectiveIdentifier);
    },
    savedObjectiveDisplayName(): IFacebookObjective["displayName"] {
      return this.savedObjective.displayName;
    },
    isSameObjectiveGoal() {
      return (
        this.$route.query.objectiveGoal ===
        this.$data.formData.objectiveGoal?.toString()
      );
    },
    formatContinueButton() {
      let renderButtonContent = "Confirm Goal";
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
<style lang="scss" scoped>
.objective-goal {
  @include view-web-gutter();
  @include mobile() {
    @include view-mobile-gutter();
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
  &__reset-btn {
    margin: 20px 0;
    max-width: 100%;
    height: 50px !important;
  }
}
</style>
