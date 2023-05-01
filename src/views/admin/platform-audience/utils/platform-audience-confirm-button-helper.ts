import facebook from "../platforms/facebook/FacebookAudienceConfirmButton.vue";

export const platforms: { [platform: string]: any } = { facebook };

export function getPlatformAudienceConfirmButton(platform: string) {
  return platforms[platform];
}
