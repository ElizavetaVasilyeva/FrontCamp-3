import Constants from '../helpers/constants';

export const email = value =>
  value && !Constants.EMAIL_REGEX.test(value) ?
    'Invalid email address' : undefined;

export const required = value => value ? undefined : 'Required';

export const asyncValidate = (values, dispatch) => {
  return fetch('/users/checkUser', {
    method: 'POST',
    body: JSON.stringify({ username: values.username, password: values.password }),
    headers: Constants.JSON_HEADER,
    credentials: 'same-origin'
  })
    .then(response => response.json())
    .then(response => {
      if (response.errors) {
        throw response.errors
      }
    }
    )
}