export const _checkObjectFieldsUpdated = (
  currentObject: object,
  savedObjectCopy: object
) => {
  return JSON.stringify(currentObject) !== JSON.stringify(savedObjectCopy);
};
