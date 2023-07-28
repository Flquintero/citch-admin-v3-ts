<template>
  <div class="instagram-connect">
    <FacebookLogin @facebook-connected="setIsFacebookAccountConnected($event)">
      <template #loading-title>
        &nbsp;Checking if you are connected to Facebook</template
      >
      <template v-if="isFacebookAccountConnected" #title
        ><h3 class="instagram-login__title">
          Great, you are connected to Facebook!
        </h3></template
      >
      <template v-else #title
        ><h3 class="instagram-login__title">
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
        <div class="instagram-connect__link-modal__body">
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
        <div class="instagram-connect__link-modal__buttons">
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
import { parseInstagramPostId } from "@/utils/facebook/instagram-post-id-finder";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");
import { EFacebookPageLinkedStatus } from "@/types/facebook/pages/enums";

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
      linkedAccountObject: {
        postId: null,
        postPlacement: null,
        instagramAccountId: null,
        status: null,
      } as {
        status: null | number;
        postId: null | string;
        postPlacement: null | string;
        postMediaType: null | string;
        instagramAccountId: null | string;
      },
      showConfirmModal: false,
    };
  },
  methods: {
    ...mapActions("Facebook", [
      "setCurrentInstagramPost",
      "setCurrentInstagramAccount",
    ]),
    // FACEBOOK Login component has a function to check connection, maybe in the future we move that function out to use globally for now no use case
    setIsFacebookAccountConnected(connectionStatus: boolean) {
      this.isFacebookAccountConnected = connectionStatus;
    },
    async buildPostId() {
      return await parseInstagramPostId(this.$route.query.post as string);
    },
    async confirmAccounts() {
      try {
        this.confirming = true;
        const accountsPayload = {
          pageId: this.currentFacebookPage.id,
          postShortCodeId: await this.buildPostId(),
        };
        this.linkedAccountObject =
          await FacebookRepository.confirmInstagramAccount(accountsPayload);
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
    async linkAccount() {
      try {
        this.isLinkingAccount = true;
        const accountsPayload = {
          pageId: this.currentFacebookPage.id,
          postShortCodeId: await this.buildPostId(),
        };
        this.linkedAccountObject =
          await FacebookRepository.linkInstagramAccount(accountsPayload);
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
    async setPostAndContinue() {
      // this probably should be a mixin
      await this.setCurrentInstagramPost({
        post: this.$route.query.post,
        postId: this.linkedAccountObject.postId,
        postPlacement: this.linkedAccountObject.postPlacement,
        postMediaType: this.linkedAccountObject.postMediaType,
      });
      await this.setCurrentInstagramAccount({
        id: this.linkedAccountObject.instagramAccountId,
      });
      await this.$router.push({
        name: "platform objective",
        params: this.$route.params,
        query: {
          ...this.$route.query,
          postId: this.linkedAccountObject.postId,
          postPlacement: this.linkedAccountObject.postPlacement,
          instagramAccountId: this.currentInstagramAccount.id,
          postMediaType: this.linkedAccountObject.postMediaType,
          pageId: this.currentFacebookPage.id,
        },
      });
    },
    toggleShowConfirmUpdateSettingsModal() {
      this.showConfirmModal = !this.showConfirmModal;
    },
  },
  computed: {
    ...mapGetters("Facebook", [
      "currentFacebookPage",
      "currentInstagramPost",
      "currentInstagramAccount",
    ]),
    statusReturned() {
      // if its a number we got it back
      return typeof this.linkedAccountObject?.status === "number";
    },
  },
});
</script>
<style lang="scss">
.instagram-connect {
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
