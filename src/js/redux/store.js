import { reducer } from './reducer';

function createStore(reducer, initialState) {
  let state = initialState;
  let callbacks = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    callbacks.forEach(callback => callback());
  }

  const subscribe = callback => {
    callbacks.push(callback);
  }

  const unsubscribe = callback => {
    callbacks = callbacks.filter(cb => cb !== callback);
  }

  return { getState, dispatch, subscribe };
}

const initialState = { heading: '' };
const store = createStore(reducer, initialState);

export { store, createStore }