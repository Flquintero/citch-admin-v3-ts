import facebook from "../platforms/facebook/FacebookPublish.vue";
import instagram from "../platforms/facebook/FacebookPublish.vue"; // they have the same objectives

export const platforms: { [property: string]: any } = { facebook, instagram };

export function getPlatformPublish(platform: string) {
  return platforms[platform];
}
