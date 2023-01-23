import { EFacebookAudienceItems } from '@/types/facebook/campaigns/enums';
import { ITabContent } from '@/types/components/interfaces';

export function setCompletedAudienceFields(
  targetAudienceItemIdentifier: EFacebookAudienceItems, // enum
  audienceTabList: Array<ITabContent>,
  newAudienceObject: ITabContent // type this
) {
  // We filter the existing audience tab list that has keys that are objects with tab info
  // we make sure they have what we need and then put them in the new array that will ultimately have the updated tab info
  return audienceTabList.map((existingAudienceItem: ITabContent) => {
    let hasFields = true;
    // make sure it is the the same tab we are passing
    if (existingAudienceItem.identifier === targetAudienceItemIdentifier) {
      // check that it has the required fields, they are set in the tab audience object
      existingAudienceItem.requiredFields?.forEach((field: string) => {
        // if it is missing just one field than we will not mark as complete
        if (!newAudienceObject[field]) {
          hasFields = false;
        }
      });
      // all fieds are there so mark as completed in the object
      if (hasFields) {
        existingAudienceItem.completed = true;
      }
    }
    return existingAudienceItem;
  });
}
