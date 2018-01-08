import { CONSTANTS, SET_ACTIONS_HEADER } from '../helpers/constants';

export const setArticlesHeader = (payload) => ({
  type: SET_ACTIONS_HEADER,
  payload,
});