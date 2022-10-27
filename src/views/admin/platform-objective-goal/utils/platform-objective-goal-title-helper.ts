import facebook from '../platforms/facebook/FacebookObjectiveGoalTitle.vue';
import instagram from '../platforms/facebook/FacebookObjectiveGoalTitle.vue'; // they have the same objectives

export let platforms: { [property: string]: any } = { facebook, instagram };

export function getPlatformObjectiveGoalTitle(platform: string) {
  return platforms[platform];
}
