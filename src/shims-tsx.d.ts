import { Config } from 'firebase/auth';
import Vue, { VNode } from 'vue';
import { Store } from 'vuex';
import { IApi } from '~/types/api-repository';
import { ApiRequestOptions } from '~/types/api-request';
import { IAnalyticsFunctions } from '~/types/analytics';

declare module 'vue/types/vue' {
  interface Vue {
    $alert: any;
    $analyticsFunctions: IAnalyticsFunctions;
    $store: Store;
    $apiRepository: IApi;
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
