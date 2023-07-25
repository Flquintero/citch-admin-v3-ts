import facebook from "../platforms/facebook/FacebookAudienceConfirmButton.vue";
import instagram from "../platforms/facebook/FacebookAudienceConfirmButton.vue";

export const platforms: { [platform: string]: any } = { facebook, instagram };

export function getPlatformAudienceConfirmButton(platform: string) {
  return platforms[platform];
}
