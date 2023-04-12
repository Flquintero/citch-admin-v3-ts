import facebook from "../platforms/facebook/FacebookDuration.vue";
import instagram from "../platforms/facebook/FacebookDuration.vue"; // they have the same objectives

export const platforms: { [property: string]: any } = { facebook, instagram };

export function getPlatformDuration(platform: string) {
  return platforms[platform];
}
