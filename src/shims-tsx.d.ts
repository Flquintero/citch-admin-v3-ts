import { Config } from 'firebase/auth';
import Vue, { VNode } from 'vue';
import { Api } from '~/types/api-repository';
import { ApiRequestOptions } from '~/types/api-request';

declare module 'vue/types/vue' {
  interface Vue {
    $api: Api;
    $alert: any;
    $apiRequest: (config: ApiRequestOptions) => Promise<any>;
  }
}
declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
