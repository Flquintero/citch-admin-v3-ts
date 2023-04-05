import facebook from "../platforms/facebook/FacebookDateTitle.vue";
import instagram from "../platforms/facebook/FacebookDateTitle.vue"; // they have the same objectives

export const platforms: { [property: string]: any } = { facebook, instagram };

export function getPlatformDateTitle(platform: string) {
  return platforms[platform];
}
