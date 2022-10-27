export function _deepCopy(data: any) {
  return JSON.parse(JSON.stringify(data));
}
// Objects that have functions
export function _deepCopyObjectsArray(data: any) {
  return data.map((item: any) => {
    return { ...item };
  });
}
