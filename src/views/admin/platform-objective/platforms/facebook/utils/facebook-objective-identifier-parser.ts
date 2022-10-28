import { FacebookObjectivesList } from './facebook-platform-objectives';
import { IFacebookObjective } from '@/types/facebook';

export function getFacebookObjectiveByIdentifier(identifier: IFacebookObjective['identifier']) {
  return FacebookObjectivesList.filter((objectivesItem: IFacebookObjective) => {
    return objectivesItem.identifier === identifier;
  })[0];
}
