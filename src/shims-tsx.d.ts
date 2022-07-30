import { Config } from 'firebase/auth';
import Vue, { VNode } from 'vue';
import { Api } from '~/types/api-repository';
import { ApiRequestOptions } from '~/types/api-request';
import { Store } from 'vuex';

declare module 'vue/types/vue' {
  interface Vue {
    $api: Api;
    $alert: any;
    $store: Store;
    $authedApiRequest: (config: ApiRequestOptions) => Promise<any>;
    $publicApiRequest: (config: ApiRequestOptions) => Promise<any>;
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
