import { getPlatformAge } from '../utils/platform-audience-age-helper';
import { getPlatformGender } from '../utils/platform-audience-gender-helper';
import { getPlatformLocation } from '../utils/platform-audience-location-helper';
import { getPlatformInterests } from '../utils/platform-audience-interests-helper';
import { EFacebookAudienceItems } from '@/types/facebook/campaigns/enums';
import { ITabContent } from '@/types/components/interfaces';

const facebook: ITabContent[] = [
  {
    text: 'Age',
    identifier: EFacebookAudienceItems.age,
    required: true,
    completed: false,
    requiredFields: ['ageMin', 'ageMax'],
    component: getPlatformAge('facebook'),
  },
  {
    text: 'Gender',
    identifier: EFacebookAudienceItems.gender,
    required: true,
    completed: false,
    requiredFields: ['gender'],
    component: getPlatformGender('facebook'),
  },
  {
    text: 'Location',
    identifier: EFacebookAudienceItems.location,
    required: true,
    completed: false,
    requiredFields: [],
    component: getPlatformLocation('facebook'),
  },
  {
    text: 'Interests',
    identifier: EFacebookAudienceItems.interests,
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
