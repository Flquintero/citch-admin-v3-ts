import facebook from "../platforms/facebook/FacebookAudienceInterests.vue";

export const platforms: { [platform: string]: any } = { facebook };

export function getPlatformInterests(platform: string) {
  return platforms[platform];
}
