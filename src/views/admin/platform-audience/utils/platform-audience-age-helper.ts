import facebook from '../platforms/facebook/FacebookAge.vue';

export let platforms: { [platform: string]: any } = { facebook };

export function getPlatformAge(platform: string) {
  return platforms[platform];
}
