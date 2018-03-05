import { createStore, applyMiddleware } from 'redux'
import stateData from './reducers/initialState'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index';

const logger = store => next => action => {
  let result
  console.groupCollapsed("dispatching", action.type)
  console.log('previous state', store.getState())
  console.log('action', action)
  result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
}

const saver = store => next => action => {
  let result = next(action)
  localStorage['redux-store'] = JSON.stringify(store.getState())
  return result
}

const storeFactory = (initialState = stateData) =>
  createStore(
    rootReducer,
    ((localStorage['redux-store']) ?
      JSON.parse(localStorage['redux-store']) :
      stateData
    ),
    applyMiddleware(thunk, logger, saver)
  )

export default storeFactory