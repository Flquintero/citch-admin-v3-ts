<template>
  <div class="tabs">
    <Tab
      v-for="(tab, index) in tabsList"
      :key="`${tab}-${index}`"
      v-bind="{ content: tab, isCurrentTab: checkCurrentTab(index) }"
      @click.native="setCurrentTab(index)"
    />
    <slot v-for="tab in tabsList" :name="tab"></slot>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Tab from '@/components/elements/tabs/partials/Tab.vue';

export default Vue.extend({
  name: 'Tabs',
  components: { Tab },
  props: {
    // tabsList: Array,
    // currentTab: Number,
  },
  data() {
    return {
      currentTabIndex: 0,
      tabsList: [
        { text: 'Age', required: true, completed: true, currentTab: true },
        { text: 'Gender', required: true, completed: true, currentTab: false },
        { text: 'Location', required: true, completed: false, currentTab: false },
        { text: 'Interests', required: false, completed: false, currentTab: false },
      ],
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
  @include flex-config();
}
</style>
