//TO DO: Change this to a more reliabled REGEX

export function parseFacebookPostId(url: string): string | undefined {
  //Need to do this to eliminate this weird param that includes other shit to the right
  if (url.includes("&__cft__[0]")) {
    url = url.split("&__cft__[0]")[0];
  }
  if (url.includes("/a.")) {
    // https://www.facebook.com/deltarigs/photos/a.128625181123559/130237054295705/
    return url.split("/")[6];
  }
  //https://www.facebook.com/permalink.php?story_fbid=pfbid02VwuxMPxGHxY6Ro3ZrnDmvQR3axbxdHHnNWrJ84LUAXsTVFY6uaFm8U4U8wtsXaERl&id=100919988703477
  if (url.includes("/permalink.php")) {
    let postId = url.split("story_fbid=")[1];
    if (postId.includes("&id=")) {
      postId = postId.split("&id=")[0];
    }
    return postId;
  }
  // https://www.facebook.com/westonlegacy/posts/pfbid0H34Vvvdotx8nJBeVxxDKtEC6VqS9bRfg77RcosCf9LHa951uG7bsuE4guW8EVDQgl
  if (url.includes("/pfbid")) {
    return url.split("/")[5];
  }
}
