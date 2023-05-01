import facebook from "../platforms/facebook/FacebookPublishTitle.vue";
import instagram from "../platforms/facebook/FacebookPublishTitle.vue"; // they have the same objectives

export const platforms: { [property: string]: any } = { facebook, instagram };

export function getPlatformPublishTitle(platform: string) {
  return platforms[platform];
}
