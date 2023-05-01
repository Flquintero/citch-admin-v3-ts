import facebook from "../platforms/facebook/FacebookBudget.vue";
import instagram from "../platforms/facebook/FacebookBudget.vue"; // they have the same objectives

export const platforms: { [property: string]: any } = { facebook, instagram };

export function getPlatformBudget(platform: string) {
  return platforms[platform];
}
