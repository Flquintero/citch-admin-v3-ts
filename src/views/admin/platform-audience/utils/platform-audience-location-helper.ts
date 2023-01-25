import facebook from "../platforms/facebook/FacebookLocation.vue";

export const platforms: { [platform: string]: any } = { facebook };

export function getPlatformLocation(platform: string) {
  return platforms[platform];
}
