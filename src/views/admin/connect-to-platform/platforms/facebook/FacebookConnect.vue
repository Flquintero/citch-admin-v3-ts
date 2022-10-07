<template>
  <div class="facebook-connect">
    <FacebookLogin @facebook-connected="setIsFacebookAccountConnected($event)">
      <template #loading-title>Checking if you are connected to Facebook</template>
      <template v-if="isFacebookAccountConnected" #title
        ><h3 class="facebook-login__title">Great, you are connected to Facebook!</h3></template
      >
      <template v-else #title
        ><h3 class="facebook-login__title">First, we need to connect your Facebook</h3></template
      >
    </FacebookLogin>
    <template v-if="isFacebookAccountConnected">
      <FacebookPageConnect>
        <template #loading-title>Checking for Facebook Pages</template>
        <template #title
          ><h3 class="facebook-page-connect__title"
            >Please select <strong>page </strong>associated to <strong>post</strong>:</h3
          ></template
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
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { parseFacebookPostId } from '@/utils/facebook/facebook-post-id-finder';
const FacebookRepository = Vue.prototype.$apiRepository.get('facebook');
const FacebookLogin = () =>
  import(
    /* webpackChunkName: "FacebookLogin" */ '@/components/functional/social-connect/facebook/facebook-login/FacebookLogin.vue'
  );
const FacebookPageConnect = () =>
  import(
    /* webpackChunkName: "FacebookPageConnect" */ '@/components/functional/social-connect/facebook/facebook-page/FacebookPageConnect.vue'
  );
const FacebookInstagramConnect = () =>
  import(
    /* webpackChunkName: "FacebookInstagramConnect" */ '@/components/functional/social-connect/facebook/FacebookInstagramConnect.vue'
  );
const Continue = () =>
  import(/* webpackChunkName: "Continue" */ '@/components/functional/Continue.vue');
export default Vue.extend({
  name: 'FacebookConnect',
  components: { FacebookLogin, FacebookPageConnect, FacebookInstagramConnect, Continue },
  data() {
    return {
      isFacebookAccountConnected: false,
      confirming: false,
    };
  },
  methods: {
    // FACEBOOK Login component has a function to check connection, maybe in the future we move that function out to use globally for now no use case
    setIsFacebookAccountConnected(connectionStatus: boolean) {
      this.isFacebookAccountConnected = connectionStatus;
    },
    async runFacebookValidations() {
      // TO DO: Find a bettwe way to scale this
      if (this.$route.query.post) {
        // GET Post ID from url
        parseFacebookPostId(this.$route.query.post as string);
        // Call to get Post with Page Id - If it returns a valid post then set it as current post, if not then throw error
      }
    },
    async confirmAccounts() {
      try {
        this.confirming = true;
        await this.runFacebookValidations();
        return;
        // Add us as admin of page
        // CREATE A CAMPAIGN IN DRAFT WITH THE POST ID
        // SAVE TO DB AS FACEBOOK CAMPAIGN with CAMPAIGN ID, Page ID, POST ID, POST URL ( MAYBE SEE IF IF CALLING THE CAMPAIGN GIVES BACK POST ID AND URL) being the first data
        const accountsPayload = {
          pageId: this.currentFacebookPage.id,
          //postId: this.currentFacebookPost, // maybe we need to create the campaign when we have an objective and give name POST_ID-OBJECTIVE-CAMPAIGN NUMBER
        };
        let t = await FacebookRepository.confirmAccounts(accountsPayload);
        console.log('TTTT', t);
        // GO TO OBJECTIVES with CAMPAIGN ID in url maybe ? SO WE CAN CALL EACH TIME IN FUTURE PAGES ?
      } catch (error: any) {
        console.log('Error Confirming Accounts', error);
        this.$alert.error(`Error Confirming Accounts: ${error}`);
      } finally {
        this.confirming = false;
      }
    },
  },
  computed: {
    ...mapGetters('Facebook', ['currentFacebookPage', 'currentFacebookPost']),
  },
});
</script>
