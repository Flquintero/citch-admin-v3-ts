import facebook from "../platforms/facebook/FacebookConnect.vue";
import instagram from "../platforms/instagram/InstagramConnect.vue";

export const platforms: { [platform: string]: any } = { facebook, instagram };

export function getPlatformConnect(platform: string) {
  return platforms[platform];
}
