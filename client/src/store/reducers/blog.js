import { BLOGS } from '../actions/constants'
import _ from 'lodash';

export const blogs = (state = {}, { type, payload }) => {
  switch (type) {
    case BLOGS.GET_BLOGS: {
      return _.mapKeys(payload, "_id");
    }
    case BLOGS.GET_BLOG:
    case BLOGS.CREATE_BLOG:
    case BLOGS.EDIT_BLOG:
      {
        return { ...state, [payload._id]: payload };
      }
    case BLOGS.DELETE_BLOG: {
      return _.omit(state, payload);
    }
    default:
      return state;
  }
}
