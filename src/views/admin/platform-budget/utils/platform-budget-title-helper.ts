import facebook from "../platforms/facebook/FacebookBudgetTitle.vue";
import instagram from "../platforms/facebook/FacebookBudgetTitle.vue"; // they have the same objectives

export const platforms: { [property: string]: any } = { facebook, instagram };

export function getPlatformBudgetTitle(platform: string) {
  return platforms[platform];
}
