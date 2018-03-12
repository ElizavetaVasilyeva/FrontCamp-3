import React from 'react';
import { mount, shallow } from 'enzyme';
import { Redirect, MemoryRouter } from 'react-router';
import AppRoutes from '../components/routes';
import Index from '../components/index/index';
import Create from '../components/createBlog/create';
import { Provider } from 'react-redux';

const initialState = { auth: { isLoggedIn: true } }

describe('Routes tests', () => {
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('Index route', () => {
 wrapper = shallow(<AppRoutes/>);
    wrapper = mount(
      <MemoryRouter initialEntries={['/whatever']}>
        <AppRoutes store={store} />
      </MemoryRouter>
    );
    expect(wrapper.find(Index)).toHaveLength(1);
  });

  it('Create route with autorized user isn`t redirected', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/create']}>
          <AppRoutes store={store} />
        </MemoryRouter>
      </Provider>,
    );
    const element = wrapper.find(Redirect);
    expect(element.length).toBe(0);
  });

  it('Create route with autorized user return component', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/create']}>
          <AppRoutes store={store} />
        </MemoryRouter>
      </Provider>,
    );
    const element = wrapper.find(Create);
    expect(element.length).toBe(1);
  });
});