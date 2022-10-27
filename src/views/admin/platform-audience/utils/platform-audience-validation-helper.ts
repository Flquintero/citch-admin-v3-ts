export function setCompletedAudienceFields(
  targetAudienceItemIdentifier: number, // enum
  audienceTabList: any,
  newAudienceObject: any
) {
  return audienceTabList.map((existingAudienceItem: any) => {
    let hasFields = true;
    if (existingAudienceItem.identifier === targetAudienceItemIdentifier) {
      existingAudienceItem.requiredFields.forEach((field: string) => {
        if (!newAudienceObject[field]) {
          hasFields = false;
        }
      });
      if (hasFields) {
        existingAudienceItem.completed = true;
      }
    }
  });
}
