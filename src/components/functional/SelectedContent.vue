<template>
  <div @click="goTo" class="selected-content">
    <div class="selected-content__text">
      <span :class="{ 'capitalized': capitalize }">{{ content }}</span>
      <div class="selected-content__action">
        <CButton v-bind="{ variant: 'link' }">
          <span><font-awesome-icon icon="fa-duotone fa-arrow-left" /> change</span>
        </CButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const CButton = () => import(/* webpackChunkName: "CButton" */ '@/components/elements/Button.vue');

export default Vue.extend({
  name: 'SelectedContent',
  components: { CButton },
  props: {
    content: String,
    capitalize: Boolean,
    url: String,
  },
  methods: {
    goTo() {
      this.$router.push(this.url);
    },
  },
});
</script>
<style lang="scss">
.selected-content {
  cursor: pointer;
  display: inline;
  &__text {
    text-decoration: underline;
    text-decoration-color: $secondary;
    position: relative;
    display: inherit;
    .capitalized {
      text-transform: capitalize;
    }
    &:hover {
      color: $secondary;
    }
  }
  &__action {
    position: absolute;
    left: 0;
    bottom: -10px;
    .c-btn-link {
      color: $secondary;
      font-size: rem(9);
      padding: 0;
    }
  }
}
</style>
