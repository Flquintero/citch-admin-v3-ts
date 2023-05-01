import facebook from "../platforms/facebook/FacebookObjectiveGoal.vue";
import instagram from "../platforms/facebook/FacebookObjectiveGoal.vue"; // they have the same objectives

export const platforms: { [property: string]: any } = { facebook, instagram };

export function getPlatformObjectiveGoal(platform: string) {
  return platforms[platform];
}
