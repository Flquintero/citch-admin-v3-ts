export function _deepCopy(data: any) {
  return JSON.parse(JSON.stringify(data));
}
// Objects that have functions
export function _deepCopyObjectsArray(data: any) {
  return data.map((item: any) => {
    return { ...item };
  });
}
// copied from SO :)
export function _capitalizeString(str: string) {
  if (!str) return;
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}
