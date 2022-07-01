import Vue, { VNode } from 'vue'

declare module 'vue/types/vue' { 
  interface Vue { 
    $v: any;
  }
}
declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
