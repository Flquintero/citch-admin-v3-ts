import facebook from "../platforms/facebook/FacebookDate.vue";
import instagram from "../platforms/facebook/FacebookDate.vue"; // they have the same objectives

export const platforms: { [property: string]: any } = { facebook, instagram };

export function getPlatformDate(platform: string) {
  return platforms[platform];
}
