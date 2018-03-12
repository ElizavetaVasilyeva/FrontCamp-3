import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import renderField from '../formElements/renderField'
import { connect } from 'react-redux';
import * as userActions from '../../store/actions/auth';
import * as validationsHelpers from '../../helpers/validationsHelpers';

class Register extends Component {

  render() {
    const { handleSubmit, submitting, valid} = this.props;
    return (
      <div className="register centerDiv">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <Field label="Name"
            placeholder="Name"
            name="name"
            component={renderField}
            type="text"
            validate={validationsHelpers.required}>
          </Field>
          <Field label="Email"
            placeholder="Email"
            name="email"
            component={renderField}
            type="text"
            validate={validationsHelpers.email}>
          </Field>
          <Field label="Username"
            placeholder="Username"
            name="username"
            component={renderField}
            type="text"
            validate={validationsHelpers.required}>
          </Field>
          <Field label="Password"
            placeholder="Password"
            name="password1"
            component={renderField}
            type="password"
            validate={validationsHelpers.required}>
          </Field>
          <Field label="Confirm Password"
            placeholder="Confirm Password"
            name="password2"
            component={renderField}
            type="password"
            validate={validationsHelpers.required}>
          </Field>

          {!valid &&
            <button className="invalid-button" type="submit" disabled={submitting}>
              Register
                    </button>
          }
          {valid &&
            <button className="valid-button" type="submit" disabled={submitting}>
              Register
                    </button>
          }
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  if (values.password1 && values.password2 && values.password1 !== values.password2) {
    errors.password2 = "Passwords don't match"
  }
  return errors
}

const asyncValidate = (values, dispatch) => {
  return fetch('/users/' + values.username)
    .then(response => response.json())
    .then(response => {
      if (response.errors) {
        throw response.errors
      }
    }
    )
}

const form = reduxForm({
  form: "registerUser",
  validate,
  asyncValidate,
  asyncBlurFields: ['username']
})(Register)

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => dispatch(userActions.register(values))
})

export default connect(null, mapDispatchToProps)(form)