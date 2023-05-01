import {
  EFacebookObjectiveValue,
  EFacebookObjectiveIdentifier,
  EFacebookObjectiveName,
  EFacebookObjectiveDisplayName,
  EFacebookObjectiveDescription,
} from "@/types/facebook/campaigns/enums";
import type { IFacebookObjective } from "@/types/facebook/campaigns/interfaces";

export const FacebookObjectivesList: IFacebookObjective[] = [
  {
    identifier: EFacebookObjectiveIdentifier.impressions,
    name: EFacebookObjectiveName.impressions,
    facebookValues: [EFacebookObjectiveValue.reach],
    displayName: EFacebookObjectiveDisplayName.impressions,
    description: EFacebookObjectiveDescription.impressions,
  },
  {
    identifier: EFacebookObjectiveIdentifier.reach,
    name: EFacebookObjectiveName.reach,
    facebookValues: [EFacebookObjectiveValue.reach],
    displayName: EFacebookObjectiveDisplayName.reach,
    description: EFacebookObjectiveDescription.reach,
  },
  {
    identifier: EFacebookObjectiveIdentifier.engagements,
    name: EFacebookObjectiveName.engagements,
    facebookValues: [EFacebookObjectiveValue.engagements],
    displayName: EFacebookObjectiveDisplayName.engagements,
    description: EFacebookObjectiveDescription.engagements,
  },
  {
    identifier: EFacebookObjectiveIdentifier.video_views,
    name: EFacebookObjectiveName.video_views,
    facebookValues: [EFacebookObjectiveValue.video_views],
    displayName: EFacebookObjectiveDisplayName.video_views,
    description: EFacebookObjectiveDescription.video_views,
  },
  {
    identifier: EFacebookObjectiveIdentifier.citch_reach,
    name: EFacebookObjectiveName.citch_reach,
    facebookValues: [
      EFacebookObjectiveValue.reach,
      EFacebookObjectiveValue.engagements,
    ],
    displayName: EFacebookObjectiveDisplayName.citch_reach,
    description: EFacebookObjectiveDescription.citch_reach,
  },
];
