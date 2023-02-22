import { getPlatformAge } from "../utils/platform-audience-age-helper";
import { getPlatformGender } from "../utils/platform-audience-gender-helper";
import { getPlatformLocation } from "../utils/platform-audience-location-helper";
import { getPlatformInterests } from "../utils/platform-audience-interests-helper";
import {
  EFacebookAudienceItems,
  EFacebookAudienceRequiredFields,
  EFacebookAudienceOptionalFields,
} from "@/types/facebook/campaigns/enums";
import type { ITabContent } from "@/types/components/interfaces";

// Create one of these for each platform
export const facebook: ITabContent[] = [
  {
    text: "Age",
    identifier: EFacebookAudienceItems.age,
    required: true,
    completed: false,
    requiredFields: EFacebookAudienceRequiredFields.age.split(","),
    component: getPlatformAge("facebook"),
  },
  {
    text: "Gender",
    identifier: EFacebookAudienceItems.gender,
    required: true,
    completed: false,
    requiredFields: EFacebookAudienceRequiredFields.gender.split(","),
    component: getPlatformGender("facebook"),
  },
  {
    text: "Location",
    identifier: EFacebookAudienceItems.location,
    required: true,
    completed: false,
    requiredFields: EFacebookAudienceRequiredFields.location.split(","),
    component: getPlatformLocation("facebook"),
  },
  {
    text: "Interests",
    identifier: EFacebookAudienceItems.interests,
    required: false,
    completed: false,
    requiredFields: EFacebookAudienceOptionalFields.interests.split(","),
    component: getPlatformInterests("facebook"),
  },
];

export const platforms: { [platform: string]: any } = { facebook };

export function getPlatformTabsList(platform: string) {
  return platforms[platform];
}
