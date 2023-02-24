import facebook from "../platforms/facebook/FacebookAudienceAge.vue";

export const platforms: { [platform: string]: any } = { facebook };

export function getPlatformAge(platform: string) {
  return platforms[platform];
}
