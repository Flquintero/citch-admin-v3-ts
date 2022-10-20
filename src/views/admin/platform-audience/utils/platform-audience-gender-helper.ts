import facebook from '../platforms/facebook/FacebookGender.vue';

export let platforms: { [platform: string]: any } = { facebook };

export function getPlatformGender(platform: string) {
  return platforms[platform];
}
