<template>
  <div class="facebook-connect">
    <FacebookLogin @facebook-connected="setIsFacebookAccountConnected($event)">
      <template #loading-title
        >Checking if you are connected to Facebook</template
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
        <template #loading-title>Checking for Facebook Pages</template>
        <template #title
          ><h3 class="facebook-page-connect__title">
            Please select <strong>page </strong>associated to
            <strong>post</strong>:
          </h3></template
        >
      </FacebookPageConnect>
      <Continue
        v-if="currentFacebookPage"
        @click.native="confirmAccounts"
        v-bind="{
          variant: 'primary',
          disabled: confirming,
          loading: confirming,
          textContent: 'Confirm',
          textIcon: 'fa-arrow-right',
          loadingContent: 'Saving to Continue',
        }"
      ></Continue>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { parseFacebookPostId } from "@/utils/facebook/facebook-post-id-finder";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");
const FacebookLogin = () =>
  import(
    /* webpackChunkName: "FacebookLogin" */ "@/components/functional/social-connect/facebook/facebook-login/FacebookLogin.vue"
  );
const FacebookPageConnect = () =>
  import(
    /* webpackChunkName: "FacebookPageConnect" */ "@/components/functional/social-connect/facebook/facebook-page/FacebookPageConnect.vue"
  );
const FacebookInstagramConnect = () =>
  import(
    /* webpackChunkName: "FacebookInstagramConnect" */ "@/components/functional/social-connect/facebook/FacebookInstagramConnect.vue"
  );
const Continue = () =>
  import(
    /* webpackChunkName: "Continue" */ "@/components/functional/Continue.vue"
  );
export default Vue.extend({
  name: "FacebookConnect",
  components: {
    FacebookLogin,
    FacebookPageConnect,
    FacebookInstagramConnect,
    Continue,
  },
  data() {
    return {
      isFacebookAccountConnected: false,
      confirming: false,
    };
  },
  methods: {
    ...mapActions("Facebook", ["setCurrentFacebookPost"]),
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
        // Add us as admin of page
        // The below two comments is for the objectives
        // CREATE A CAMPAIGN IN DRAFT WITH THE POST ID
        // SAVE TO DB AS FACEBOOK CAMPAIGN with CAMPAIGN ID, Page ID, POST ID, POST URL ( MAYBE SEE IF IF CALLING THE CAMPAIGN GIVES BACK POST ID AND URL) being the first data
        const accountsPayload = {
          pageId: this.currentFacebookPage.id,
          // we have it here for effciency as we will have the page token in this call and leverage the one call to get the page to validate the post page relationship
          ...(this.$route.query.post
            ? { postId: await this.buildPostId() }
            : null),
        };
        const confirmObject = await FacebookRepository.confirmAccounts(
          accountsPayload
        );
        // this probably should be a mixin
        await this.setCurrentFacebookPost({
          post: this.$route.query.post,
          postId: confirmObject.postId,
        });
        await this.$router.push({
          name: "platform objective",
          params: this.$route.params,
          query: { ...this.$route.query, postId: confirmObject.postId },
        });

        // GO TO OBJECTIVES with CAMPAIGN ID in url maybe ? SO WE CAN CALL EACH TIME IN FUTURE PAGES ?
      } catch (error: any) {
        console.log("Error Confirming Accounts", error);
        this.$alert.error(`Error Confirming Accounts: ${error}`);
      } finally {
        this.confirming = false;
      }
    },
  },
  computed: {
    ...mapGetters("Facebook", ["currentFacebookPage", "currentFacebookPost"]),
  },
});
</script>
