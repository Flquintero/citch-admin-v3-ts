export function parseInstagramPostId(url: string): string | undefined {
  // https://www.instagram.com/p/Cs8zx3ZrU0n/
  const splitArray = url.split("/").filter(Boolean);
  const splitArraylength = splitArray.length;
  const splitArrayLastItem = splitArraylength - 1;
  return splitArray[splitArrayLastItem];
}
