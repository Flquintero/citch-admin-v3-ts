export function setCompletedAudienceFields(platform: string, audienceObject: any, audienceList: any) {
  return audienceList.map((audienceVariableProperty: any) => {
    let hasFields = true;
    audienceVariableProperty.requiredFields.forEach((field: string) => {
      console.log('field', field);
      console.log('audienceObject', audienceObject);
      if (!audienceObject[field]) {
        hasFields = false;
      }
    });
    if (hasFields) {
      audienceVariableProperty.completed = true;
    }
  });
}
