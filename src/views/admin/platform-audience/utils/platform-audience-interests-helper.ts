import facebook from "../platforms/facebook/FacebookInterests.vue";

export const platforms: { [platform: string]: any } = { facebook };

export function getPlatformInterests(platform: string) {
  return platforms[platform];
}
