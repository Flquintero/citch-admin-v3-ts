import facebook from "../platforms/facebook/FacebookAudienceTitle.vue";
import instagram from "../platforms/facebook/FacebookAudienceTitle.vue"; // they have the same objectives

export const platforms: { [property: string]: any } = { facebook, instagram };

export function getPlatformAudienceTitle(platform: string) {
  return platforms[platform];
}
