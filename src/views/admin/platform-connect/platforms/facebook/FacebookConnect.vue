<template>
  <div class="facebook-connect">
    <FacebookLogin @facebook-connected="setIsFacebookAccountConnected($event)">
      <template #loading-title>
        &nbsp;Checking if you are connected to Facebook</template
      >
      <template v-if="isFacebookAccountConnected" #title
        ><h3 class="facebook-login__title">
          Great, you are connected to Facebook!
        </h3></template
      >
      <template v-else #title
        ><h3 class="facebook-login__title">
          First, we need to connect your Facebook
        </h3></template
      >
    </FacebookLogin>
    <template v-if="isFacebookAccountConnected">
      <FacebookPageConnect>
        <template #loading-title>&nbsp;Checking for Facebook Pages</template>
        <template #title
          ><h3 class="facebook-page-connect__title">
            Please select <strong>page </strong>associated to
            <strong>post</strong>:
          </h3></template
        >
      </FacebookPageConnect>
      <ContinueButton
        v-if="currentFacebookPage"
        @click.native="confirmAccounts"
        v-bind="{
          variant: 'primary',
          disabled: confirming,
          loading: confirming,
          textContent: 'Confirm',
          textIcon: 'fa-arrow-right',
          loadingContent: 'Saving',
        }"
      ></ContinueButton>
    </template>
    <CModal
      v-if="showConfirmModal"
      :header-text="`Manage your FB page: ${
        this.currentFacebookPage?.name || ''
      }`"
    >
      <template #body>
        <div class="facebook-connect__link-modal__body">
          <p>
            As an Admin, in order to create ads for your post you will need to
            grant the Citch app access to be an Admin in your Facebook page
            {{ currentFacebookPage.name }}.
          </p>

          <p>
            Click below to update your Facebook Page settings to make Citch App
            admin to {{ currentFacebookPage.name }}
          </p>
        </div>
      </template>
      <template #footer>
        <div class="facebook-connect__link-modal__buttons">
          <CButton
            variant="primary"
            :disabled="isLinkingAccount"
            @click.native="linkAccount"
          >
            <span v-if="isLinkingAccount">
              <font-awesome-icon icon="fa-duotone fa-circle-notch" spin />
              Updating</span
            ><span v-else>Confirm Page Settings Update</span>
          </CButton>
          <CButton
            variant="link"
            :disabled="isLinkingAccount"
            @click.native="toggleShowConfirmUpdateSettingsModal"
          >
            <span>Cancel</span>
          </CButton>
        </div>
      </template>
    </CModal>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { parseFacebookPostId } from "@/utils/facebook/facebook-post-id-finder";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");
import { EFacebookPageLinkedStatus } from "@/types/facebook/pages/enums";
import { FacebookObjectivesList } from "@/views/admin/platform-objective/platforms/facebook/utils/facebook-platform-objectives";
import type {
  IFacebookObjective,
  ISaveFacebookCampaignObject,
} from "@/types/facebook/campaigns/interfaces";
import dayjs from "dayjs";

const FacebookLogin = () =>
  import(
    /* webpackChunkName: "FacebookLogin" */ "@/components/functional/social-connect/facebook/facebook-login/FacebookLogin.vue"
  );
const FacebookPageConnect = () =>
  import(
    /* webpackChunkName: "FacebookPageConnect" */ "@/components/functional/social-connect/facebook/facebook-page/FacebookPageConnect.vue"
  );
const ContinueButton = () =>
  import(
    /* webpackChunkName: "ContinueButton" */ "@/components/functional/ButtonContinue.vue"
  );
const CButton = () =>
  import(
    /* webpackChunkName: "CButton" */ "@/components/elements/BaseButton.vue"
  );
const CModal = () =>
  import(
    /* webpackChunkName: "BaseModal" */ "@/components/functional/modal/BaseModal.vue"
  );
export default defineComponent({
  name: "FacebookConnect",
  components: {
    FacebookLogin,
    FacebookPageConnect,
    ContinueButton,
    CButton,
    CModal,
  },
  data() {
    return {
      isFacebookAccountConnected: false,
      confirming: false,
      isLinkingAccount: false,
      isSavingCampaign: false,
      isSettingPostAndCampaign: false,
      linkedAccountObject: { postId: null, status: null } as {
        status: null | number;
        postId: null | string;
      },
      showConfirmModal: false,
      chosenObjective: FacebookObjectivesList[2] as IFacebookObjective,
    };
  },
  methods: {
    ...mapActions("Facebook", [
      "setCurrentFacebookPost",
      "setCurrentFacebookCampaign",
    ]),
    // FACEBOOK Login component has a function to check connection, maybe in the future we move that function out to use globally for now no use case
    setIsFacebookAccountConnected(connectionStatus: boolean) {
      this.isFacebookAccountConnected = connectionStatus;
    },
    async buildPostId() {
      // the actual structure to use a facebook post in api is {{pageId}}_{{postIdentifierParsedFromUrl}}
      return `${this.currentFacebookPage.id}_${await parseFacebookPostId(
        this.$route.query.post as string
      )}`;
    },
    async confirmAccounts() {
      try {
        this.confirming = true;
        const accountsPayload = {
          pageId: this.currentFacebookPage.id,
          // We do this for efficiency, we need to confirm the post using the page token so not to get it twice
          ...(this.$route.query.post
            ? { postId: await this.buildPostId() }
            : null),
        };
        this.linkedAccountObject =
          await FacebookRepository.confirmFacebookAccount(accountsPayload);
        const connectSystemUser =
          this.statusReturned &&
          this.linkedAccountObject.status ===
            EFacebookPageLinkedStatus.not_linked;
        if (connectSystemUser) {
          this.toggleShowConfirmUpdateSettingsModal();
        } else {
          this.setPostAndContinue();
        }
      } catch (error: any) {
        console.log("Error Confirming Accounts", error);
        this.$alert.error(`Error Confirming Accounts: ${error}`);
      } finally {
        this.confirming = false;
      }
    },
    async setPostAndContinue() {
      // this probably should be a mixin
      await this.setCurrentFacebookPost({
        post: this.$route.query.post,
        postId: this.linkedAccountObject.postId,
      });
      // create campaign with engagement as objective
      const campaignId = await this.initSaveCampaign();
      await this.$router.push({
        name: "platform audience",
        params: this.$route.params,
        query: {
          ...this.$route.query,
          postId: this.linkedAccountObject.postId,
          pageId: this.currentFacebookPage.id,
          campaignId,
          objective: this.chosenObjective?.identifier.toString(),
        },
      });
    },
    async linkAccount() {
      try {
        this.isLinkingAccount = true;
        const accountsPayload = {
          pageId: this.currentFacebookPage.id,
          // We do this for efficiency, we need to confirm the post using the page token so not to get it twice
          // However we could abstract the getting page token functionality and just call it when we set post and continue  method
          ...(this.$route.query.post
            ? { postId: await this.buildPostId() }
            : null),
        };
        this.linkedAccountObject = await FacebookRepository.linkFacebookAccount(
          accountsPayload
        );
        if (
          this.linkedAccountObject.status === EFacebookPageLinkedStatus.linked
        ) {
          this.setPostAndContinue();
        } else {
          throw new Error("Was not abled to link and unlinked account");
        }
      } catch (error: any) {
        console.log("Error Confirming Accounts", error);
        this.$alert.error(`Error Linking Accounts Accounts: ${error}`);
      } finally {
        this.isLinkingAccount = false;
      }
    },
    // we want to create a campaign right of the bat
    async initSaveCampaign() {
      try {
        this.isSavingCampaign = true;
        const pageId = this.currentFacebookPage.id as string; // this.currentPost.split("_")[0]; <--- could be not consistent
        const postId = this.linkedAccountObject.postId as string;
        // const postPlacement = this.linkedAccountObject.postPlacement as string;
        // const postMediaType = this.linkedAccountObject.postMediaType as string;
        // const instagramAccountId = this.linkedAccountObject
        //   .instagramAccountId as string;
        const now = dayjs().format("MM-DD-YY-Thhmmss");
        const campaignObject: ISaveFacebookCampaignObject = {
          saveCampaignObject: {
            ...(this.isSavedCampaign
              ? { campaignId: this.savedCampaign as string }
              : null),
            pageId,
            postId,
            // postPlacement,
            // postMediaType,
            // ...(instagramAccountId ? { instagramAccountId } : null),
            platform: this.currentPlatform,
            campaignData: {
              name: `${now}-${pageId}-${this.currentPlatform}-${this.chosenObjective?.displayName}`,
              facebookObjectiveValues: this.chosenObjective
                ?.facebookValues as IFacebookObjective["facebookValues"],
              facebookObjectiveIdentifier: this.chosenObjective
                ?.identifier as IFacebookObjective["identifier"],
            },
          },
        };
        const savedCampaign: string =
          await FacebookRepository.saveCampaignObjective(campaignObject);
        const campaignId: string = savedCampaign;
        await this.setCurrentFacebookCampaign({
          campaignId,
        });
        return campaignId;
      } catch (error: any) {
        this.$alert.error(`Error Saving Campaign Facebook: ${error}`);
      } finally {
        this.isSavingCampaign = false;
      }
    },
    toggleShowConfirmUpdateSettingsModal() {
      this.showConfirmModal = !this.showConfirmModal;
    },
  },
  computed: {
    ...mapGetters("Facebook", ["currentFacebookPage", "currentFacebookPost"]),
    statusReturned() {
      // if its a number we got it back
      return typeof this.linkedAccountObject?.status === "number";
    },
    currentPlatform(): string {
      return this.$route.params.platform;
    },
  },
});
</script>
<style lang="scss">
.facebook-connect {
  &__link-modal {
    &__body {
      margin-top: 20px;
      p:first-of-type {
        margin-bottom: 10px !important;
      }
    }
    &__buttons {
      height: 100px;
      display: flex;
      flex-direction: column;
      padding: 10px;
      margin-top: 20px;
    }
  }
}
</style>
