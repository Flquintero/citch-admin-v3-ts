import facebook from '../platforms/facebook/FacebookLocation.vue';

export let platforms: { [platform: string]: any } = { facebook };

export function getPlatformLocation(platform: string) {
  return platforms[platform];
}
