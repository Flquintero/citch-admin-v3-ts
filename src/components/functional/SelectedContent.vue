<template>
  <div @click="goTo" class="selected-content">
    <div class="selected-content__text">
      <span :class="{ 'capitalized': capitalize }">{{ content }}</span>
      <div class="selected-content__action">
        <CButton v-bind="{ variant: 'link' }">
          <span><font-awesome-icon icon="fa-duotone fa-arrow-left" /> edit</span>
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
