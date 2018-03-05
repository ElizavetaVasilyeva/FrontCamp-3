import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import renderField from '../formElements/renderField'
import { connect } from 'react-redux';
import * as userActions from '../../store/actions/auth';
import * as validationsHelpers from '../../helpers/validationsHelpers';


class Login extends Component {

  render() {
    const { handleSubmit, submitting, valid} = this.props;
    return (
      <div className="login centerDiv">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <Field label="Username"
            placeholder="Username"
            name="username"
            component={renderField}
            type="text"
            validate={validationsHelpers.required}>
          </Field>
          <Field label="Password"
            placeholder="Password"
            name="password"
            component={renderField}
            type="password"
            validate={validationsHelpers.required}>
          </Field>

          {!valid &&
            <button className="invalid-button" type="submit" disabled={submitting}>
              Login
                    </button>
          }
          {valid &&
            <button className="valid-button" type="submit" disabled={submitting}>
              Login
                    </button>
          }
        </form>
      </div>
    )
  }
}

const asyncValidate = (values, dispatch) => {
  return fetch('/users/checkUser', {
    method: 'POST',
    body: JSON.stringify({ username: values.username, password: values.password }),
    headers: { "Content-Type": "application/json" },
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

const form = reduxForm({
  form: "login",
  asyncValidate,
  asyncBlurFields: ['username', 'password']
})(Login)

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => dispatch(userActions.login(JSON.stringify({ password: values.password, username: values.username })))
})

export default connect(null, mapDispatchToProps)(form)