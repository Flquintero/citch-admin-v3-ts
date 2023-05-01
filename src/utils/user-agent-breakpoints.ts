export function getUserAgent(deviceWidth: number) {
  if (deviceWidth < 375) return "mobile-small";
  if (deviceWidth >= 375 && deviceWidth < 768) return "mobile";
  if (deviceWidth >= 768 && deviceWidth <= 1024) return "tablet";
  if (deviceWidth > 1024 && deviceWidth < 1200) return "desktop";
  if (deviceWidth >= 1200 && deviceWidth < 1440) return "desktop-lg";
  return "desktop-xl";
}
