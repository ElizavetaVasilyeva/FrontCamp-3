import * as blogsActions from '../store/actions/blog';
import Constants from '../helpers/constants'; 

let store = mockStore();

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: Constants.JSON_HEADER
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