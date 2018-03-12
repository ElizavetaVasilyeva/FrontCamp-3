import { combineReducers } from 'redux';
import { blogs } from './blog';
import { auth } from './auth';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({ blogs, auth, form: formReducer })
