import { USERS } from './constants';
import Constants from '../../helpers/constants'; 

export const login = (values) => dispatch => {
  fetch('/users/login', {
    method: 'POST',
    body: values,
    headers: Constants.JSON_HEADER,
  })
    .then(
      res => res.json()
    )
    .then(user => {
      dispatch({ type: USERS.LOGIN, payload: user })
    })
}

export const register = (values) => dispatch => {
  fetch('/users/register', {
    method: 'POST',
    body: JSON.stringify({ name: values.name, email: values.email, username: values.username, password: values.password1 }),
    headers: Constants.JSON_HEADER,
  })
    .then(
      response => response.json(),
      error => console.log('An error occured.', error)
    )
    .then(
      username => dispatch({ type: USERS.REGISTER, payload: username })
    )
}

export const logout = () => dispatch => {
  dispatch({ type: USERS.LOGOUT })
}