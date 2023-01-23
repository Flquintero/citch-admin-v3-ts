<template>
  <div @click="goTo" class="selected-content">
    <div class="selected-content__text">
      <span :class="{ capitalized: capitalize }">{{ formattedContent() }}</span>
      <div class="selected-content__action">
        <CButton v-bind="{ variant: 'link' }">
          <span
            ><font-awesome-icon icon="fa-duotone fa-arrow-left" /> change</span
          >
        </CButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
const CButton = () =>
  import(/* webpackChunkName: "CButton" */ "@/components/elements/Button.vue");

export default Vue.extend({
  name: "SelectedContent",
  components: { CButton },
  props: {
    content: String,
    capitalize: Boolean,
    addQueryParams: Boolean,
    url: String,
    isPlural: Boolean,
  },
  methods: {
    goTo() {
      this.$router.push({
        path: this.url,
        ...(this.addQueryParams ? { query: this.$route.query } : null),
      });
    },
    formattedContent() {
      let renderContent = this.content;
      // TO Do: If options get bigger include a validation function or something to abstract it out
      if (this.isPlural) {
        renderContent = `${renderContent}s`;
      }
      return renderContent;
    },
  },
});
</script>
<style lang="scss" scoped>
.selected-content {
  cursor: pointer;
  display: inline;
  &__text {
    text-decoration: underline;
    text-decoration-color: $primary;
    position: relative;
    display: inherit;
    .capitalized {
      text-transform: capitalize;
    }
    &:hover {
      color: $primary;
    }
  }
  &__action {
    position: absolute;
    left: 0;
    bottom: -11px;
    .c-btn-link {
      color: $primary;
      font-size: rem(9);
      padding: 0;
    }
  }
}
</style>
