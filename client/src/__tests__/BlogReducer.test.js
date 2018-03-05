import { blogs as blogReducer } from '../store/reducers/blog'

describe('Test blogReducer', () => {
  it('Reducer for GET_BLOGS', () => {
    let data = { "_id": "1", "title": "First blog" };
    let state = {};
    state = blogReducer(state, { type: "GET_BLOGS", payload: [data] });
    expect(state).toEqual({ [data._id]: data });
  });

  it('Reducer for CREATE_BLOG', () => {
    let state = { "1": { "_id": "1", "title": "First blog" } };
    state = blogReducer(state, { type: "CREATE_BLOG", payload: { "_id": "2", "title": "Second blog" } })
    expect(state).toEqual({ "1": { "_id": "1", "title": "First blog" }, "2": { "_id": "2", "title": "Second blog" } });
  });
});