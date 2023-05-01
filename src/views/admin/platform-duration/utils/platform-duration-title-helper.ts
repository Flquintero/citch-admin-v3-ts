import facebook from "../platforms/facebook/FacebookDurationTitle.vue";
import instagram from "../platforms/facebook/FacebookDurationTitle.vue"; // they have the same objectives

export const platforms: { [property: string]: any } = { facebook, instagram };

export function getPlatformDurationTitle(platform: string) {
  return platforms[platform];
}
