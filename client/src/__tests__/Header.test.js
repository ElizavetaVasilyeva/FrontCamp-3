import React from 'react';
import Header from '../components/header/header';
import LoggedInNav from '../components/header/LoggedInNav';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import * as userActions from '../store/actions/auth';


configure({ adapter: new Adapter() });
const initialState = { auth: { isLoggedIn: false } }

describe('Header tests', () => {
  const mockStore = configureStore();
  let store, container

  beforeEach(() => {
    store = mockStore(initialState)
    container = shallow(<Header store={store} />)
  })

  it('Render the component', () => {
    expect(container.length).toEqual(1)
  });

  it('Check Prop matches with initialState', () => {
    expect(container.prop('isLoggedIn')).toEqual(initialState.auth.isLoggedIn)
  });
});

describe('LoggedInNav tests', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let store, wrapper

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><LoggedInNav /></Provider>)
  })

  it('Render the component', () => {
    expect(wrapper.find(LoggedInNav).length).toEqual(1)
  });

  it('Check action on dispatching ', () => {
    wrapper.find('#logout').simulate('click');
    const unsubscribe = store.subscribe(() => {
      const actions = store.getActions();
      expect(actions.length).to.have.length.above(0);
    });

    let actions = store.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0].type).toBe("LOGOUT")
  });
});