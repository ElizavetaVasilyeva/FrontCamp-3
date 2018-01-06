import { CONSTANTS } from '../helpers/constants';

export const reducer = (state = {}, action = {}) => {
  const store = { ...state };
  switch (action.type) {
    case CONSTANTS.SOURCES:
      store.heading = action.heading;
      return store;
    case CONSTANTS.ARTICLES:
      store.heading = action.heading;
      return store;
    default:
      return state;
  }
}