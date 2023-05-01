import facebook from "../platforms/facebook/FacebookObjectives.vue";
import instagram from "../platforms/facebook/FacebookObjectives.vue"; // they have the same objectives

export const platforms: { [property: string]: any } = { facebook, instagram };

export function getPlatformObjectives(platform: string) {
  return platforms[platform];
}
