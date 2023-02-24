import facebook from "../platforms/facebook/FacebookAudienceGender.vue";

export const platforms: { [platform: string]: any } = { facebook };

export function getPlatformGender(platform: string) {
  return platforms[platform];
}
