import { IResponsiveState } from "./types";

export const getters = {
  isMobileSm(state: IResponsiveState) {
    return state.userAgent === "mobile-small" || false;
  },
  isMobile(state: IResponsiveState) {
    return state.userAgent === "mobile" || false;
  },
  mobileAndDown(state: IResponsiveState) {
    return state.userAgent?.includes("mobile");
  },
  mobileAndUp(state: IResponsiveState) {
    return (
      ["mobile", "tablet"].includes(state.userAgent || "") ||
      state.userAgent?.includes("desktop")
    );
  },

  isDesktop(state: IResponsiveState) {
    return state.userAgent === "desktop" || false;
  },

  isDesktopLg(state: IResponsiveState) {
    return state.userAgent === "desktop-lg" || false;
  },

  isDesktopXl(state: IResponsiveState) {
    return state.userAgent === "desktop-xl" || false;
  },

  tabletAndDown(state: IResponsiveState) {
    return (
      state.userAgent === "tablet" ||
      state.userAgent?.includes("mobile") ||
      false
    );
  },

  tabletAndUp(state: IResponsiveState) {
    return (
      state.userAgent === "tablet" ||
      state.userAgent?.includes("desktop") ||
      false
    );
  },

  desktopAndUp(state: IResponsiveState) {
    return state.userAgent?.includes("desktop") || false;
  },
};
