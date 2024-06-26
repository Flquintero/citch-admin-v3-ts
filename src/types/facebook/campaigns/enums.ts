export enum EFacebookObjectiveValue {
  reach = "REACH",
  engagements = "POST_ENGAGEMENT",
  video_views = "VIDEO_VIEWS",
}

export enum EFacebookObjectiveName {
  impressions = "impressions",
  reach = "reach",
  engagements = "engagements",
  video_views = "video views",
  citch_reach = "citch_reach",
}

export enum EFacebookObjectiveDisplayName {
  impressions = "Impressions",
  reach = "Reach",
  engagements = "Engagements",
  video_views = "Video Views",
  citch_reach = "Citch Reach",
}

export enum EFacebookObjectiveDescription {
  impressions = "Get more views from a specific demographicof people",
  reach = "Get more views from a specific demographicof people",
  engagements = "Get more likes and comments from a spefic demographic",
  video_views = "Get more video views from a specific group of people",
  citch_reach = "Get more views, likes and comments from a specific group of people",
}

export enum EFacebookObjectiveIdentifier {
  impressions,
  reach,
  engagements,
  video_views,
  citch_reach,
}

export enum EFacebookAudienceItems {
  age,
  gender,
  location,
  interests,
}

export enum EFacebookAudienceRequiredFields {
  age = "ageMin,ageMax",
  gender = "gender",
  location = "chosenLocations",
}

export enum EFacebookAudienceOptionalFields {
  interests = "chosenInterests",
}

export enum EFacebookAudienceGender {
  all,
  male,
  female,
}
