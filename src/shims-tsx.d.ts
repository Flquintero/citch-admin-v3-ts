import Vue, { VNode } from 'vue'
import { Api } from '~/types/api-repository';

declare module 'vue/types/vue' {
  interface Vue {
    $api: Api;
    $alert: any;
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
