import facebook from './facebook/FacebookPost.vue';
import instagram from './instagram/InstagramPost.vue';

export let posts: { [property: string]: any } = { facebook, instagram };

export function getPlatformPost(platform: string) {
  return posts[platform];
}
