<template>
  <div class="tabs">
    <div class="tabs__list">
      <TabsMenuItem
        v-for="(tab, index) in tabsList"
        :key="`${tab.text}-${index}`"
        v-bind="{ content: tab, isCurrentTab: checkCurrentTab(index) }"
        @click.native="setCurrentTab(index)"
      />
    </div>
    <slot name="tab-content"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { ITabContent } from "@/types/components/interfaces";

const TabsMenuItem = () =>
  import(
    /* webpackChunkName: "TabsMenuItem" */ "@/components/elements/tabs-menu/partials/TabsMenuItem.vue"
  );

export default defineComponent({
  name: "TabsMenu",
  components: { TabsMenuItem },
  props: {
    tabsList: Array as PropType<ITabContent>,
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
      this.$emit("tab-selected", tabIndex);
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
