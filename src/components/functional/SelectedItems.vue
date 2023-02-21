<template>
  <div class="selected-items">
    <CPill
      v-for="(item, index) in itemsList"
      :pill-text="item[renderTextKey]"
      :pill-index="index"
      :key="item.key"
      @remove="$emit('removed-item', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

const CPill = () =>
  import(/* webpackChunkName: "CPill" */ "@/components/elements/BasePill.vue");

export default defineComponent({
  name: "SelectedItems",
  components: { CPill },
  props: {
    itemsList: {
      type: Array as PropType<any[]>,
    },
    renderTextKey: {
      type: String,
    },
  },
  data() {
    return {
      variantsMap: {
        primary: "c-pill-primary",
      },
    };
  },
});
</script>
<style lang="scss">
.selected-items {
  @include flex-config($flex-wrap: wrap);
  @include center-with-margin($max-width: 750px, $top: 20px, $bottom: 20px);
}
</style>
