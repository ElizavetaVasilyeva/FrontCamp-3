import { CONSTANTS, SET_ACTIONS_HEADER } from '../helpers/constants';

export const reducer = (state = {}, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ACTIONS_HEADER:
      const heading = `${payload.heading} articles`.toUpperCase();
      return Object.assign({}, state, { heading });
    default:
      return state;
  }
};