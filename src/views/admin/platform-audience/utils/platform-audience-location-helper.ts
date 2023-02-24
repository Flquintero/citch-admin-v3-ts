import facebook from "../platforms/facebook/FacebookAudienceLocation.vue";

export const platforms: { [platform: string]: any } = { facebook };

export function getPlatformLocation(platform: string) {
  return platforms[platform];
}
