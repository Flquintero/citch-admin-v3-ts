import { FacebookObjectivesList } from "./facebook-platform-objectives";
import type { IFacebookObjective } from "@/types/facebook/campaigns/interfaces";

export function getFacebookObjectiveByIdentifier(
  identifier: IFacebookObjective["identifier"]
) {
  return FacebookObjectivesList.filter((objectivesItem: IFacebookObjective) => {
    return objectivesItem.identifier === identifier;
  })[0];
}
