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
import CButton from '@/components/elements/Button.vue';

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
  &__text {
    text-decoration: underline;
    position: relative;
    .capitalized {
      text-transform: capitalize;
    }
  }
  &__action {
    position: absolute;
    .c-btn-link {
      color: $secondary;
      font-size: rem(9);
      padding: 0;
    }
  }
}
</style>
