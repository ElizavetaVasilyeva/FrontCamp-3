import * as blogsActions from '../store/actions/blog'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore();

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

describe('Test blogsActions', () => {
  it('Call getBlogs action', () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, '[]')));

    return store.dispatch(blogsActions.getBlogs())
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(1);
        expect(expectedActions).toContainEqual({ "payload": [], "type": "GET_BLOGS" });
      })
  });
});