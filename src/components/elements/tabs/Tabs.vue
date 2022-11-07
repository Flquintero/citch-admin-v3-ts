<template>
  <div class="tabs">
    <div class="tabs__list">
      <Tab
        v-for="(tab, index) in tabsList"
        :key="`${tab.text}-${index}`"
        v-bind="{ content: tab, isCurrentTab: checkCurrentTab(index) }"
        @click.native="setCurrentTab(index)" />
    </div>
    <slot name="tab-content"></slot>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Tab from '@/components/elements/tabs/partials/Tab.vue';
import { ITabContent } from '@/types/components/interfaces';

export default Vue.extend({
  name: 'Tabs',
  components: { Tab },
  props: {
    tabsList: Array as () => Array<ITabContent>,
  },
  data() {
    return {
      currentTabIndex: 0,
    };
  },
  methods: {
    checkCurrentTab(tabIndex: number) {
      return this.currentTabIndex === tabIndex;
    },
    setCurrentTab(tabIndex: number) {
      this.currentTabIndex = tabIndex;
      this.$emit('tab-selected', tabIndex);
    },
  },
});
</script>
<style lang="scss" scoped>
.tabs {
  @include flex-config($flex-direction: column);
  &__list {
    @include flex-config();
  }
}
</style>
