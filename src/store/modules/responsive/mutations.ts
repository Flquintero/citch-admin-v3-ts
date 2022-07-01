export const mutations = {
  SET_DEVICE_WIDTH(state:any, payload:number) {
    state.deviceWidth = payload;
  },
  SET_USER_AGENT(state:any, payload:string) {
    state.userAgent = payload;
  },
};
