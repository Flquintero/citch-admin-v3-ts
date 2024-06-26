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
    /* webpackChunkName: "TabsMenuItem" */ "@/components/functional/tabs-menu/partials/TabsMenuItem.vue"
  );

export default defineComponent({
  name: "TabsMenu",
  components: { TabsMenuItem },
  props: {
    tabsList: Array as PropType<ITabContent[]>,
  },
  data() {
    return {
      currentTabIndex: null as null | number,
    };
  },
  beforeDestroy() {
    this.clearSavedtab();
  },
  created() {
    this.setInitialTab();
  },
  methods: {
    clearSavedtab() {
      const { currentTab, ...desiredQueryParams } = this.$route.query;
      this.$router.replace({
        query: desiredQueryParams,
      });
    },
    checkCurrentTab(tabIndex: number) {
      return this.currentTabIndex === tabIndex;
    },
    setCurrentTab(tabIndex: number) {
      this.currentTabIndex = tabIndex;
      this.$emit("tab-selected", tabIndex);
      this.setUrlQuery();
    },
    setInitialTab() {
      const savedTabIndex = this.$route.query.currentTab;
      if (savedTabIndex) {
        this.setCurrentTab(parseInt(savedTabIndex as string));
      } else {
        this.setCurrentTab(0);
      }
    },
    // for when you reset
    async setUrlQuery() {
      // avoid nav duplicate error
      if (
        this.currentTabIndex ===
        parseInt(this.$route.query.currentTab as string)
      ) {
        return;
      }

      await this.$router.replace({
        query: {
          ...this.$route.query,
          currentTab: this.currentTabIndex?.toString(),
        },
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.tabs {
  @include flex-config($flex-direction: column);
  &__list {
    @include flex-config($justify-content: center, $flex-wrap: wrap);
  }
}
</style>
