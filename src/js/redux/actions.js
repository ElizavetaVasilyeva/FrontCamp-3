import { CONSTANTS } from '../helpers/constants';

export const actions = {
  articles: sourceId => ({
    type: CONSTANTS.ARTICLES,
    heading: `${sourceId} articles`.toUpperCase()
  })
};