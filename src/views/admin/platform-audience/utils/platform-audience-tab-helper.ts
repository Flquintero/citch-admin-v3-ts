import { getPlatformAge } from '../utils/platform-audience-age-helper';
import { getPlatformGender } from '../utils/platform-audience-gender-helper';
import { getPlatformLocation } from '../utils/platform-audience-location-helper';
import { getPlatformInterests } from '../utils/platform-audience-interests-helper';
import { FacebookAudienceItems } from '@/types/facebook';

const facebook = [
  {
    text: 'Age',
    identifier: FacebookAudienceItems.age,
    required: true,
    completed: false,
    requiredFields: ['ageMin', 'ageMax'],
    component: getPlatformAge('facebook'),
  },
  {
    text: 'Gender',
    identifier: FacebookAudienceItems.gender,
    required: true,
    completed: false,
    requiredFields: [],
    component: getPlatformGender('facebook'),
  },
  {
    text: 'Location',
    identifier: FacebookAudienceItems.location,
    required: true,
    completed: false,
    requiredFields: [],
    component: getPlatformLocation('facebook'),
  },
  {
    text: 'Interests',
    identifier: FacebookAudienceItems.interests,
    required: false,
    completed: false,
    requiredFields: [],
    component: getPlatformInterests('facebook'),
  },
];

export let platforms: { [platform: string]: any } = { facebook };

export function getPlatformTabsList(platform: string) {
  return platforms[platform];
}
