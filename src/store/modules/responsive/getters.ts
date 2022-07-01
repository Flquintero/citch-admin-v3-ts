export const getters = {
  isMobileSm(state) {
    return state.userAgent === 'mobile-small' || false;
  },
  isMobile(state) {
    return state.userAgent === 'mobile' || false;
  },
  mobileAndDown(state) {
    return state.userAgent?.includes('mobile');
  },
  mobileAndUp(state) {
    return ['mobile', 'tablet'].includes(state.userAgent || '') || state.userAgent?.includes('desktop');
  },

  isDesktop(state) {
    return state.userAgent === 'desktop' || false;
  },

  isDesktopLg(state) {
    return state.userAgent === 'desktop-lg' || false;
  },

  isDesktopXl(state) {
    return state.userAgent === 'desktop-xl' || false;
  },

  tabletAndDown(state) {
    return state.userAgent === 'tablet' || state.userAgent?.includes('mobile') || false;
  },

  tabletAndUp(state) {
    return state.userAgent === 'tablet' || state.userAgent?.includes('desktop') || false;
  },

  desktopAndUp(state) {
    return state.userAgent?.includes('desktop') || false;
  },
};
