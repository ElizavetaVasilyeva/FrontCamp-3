import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormErrors from '../errors/formErrors';
import Constants from '../../helpers/constants';
import FormElement from '../formElements/formElement';
import './create.css';
import { connect } from 'react-redux';
import * as blogActions from '../../store/actions/blog'


class Create extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      body: '',
      formErrors: { title: '', author: '', body: '' },
      titleValid: false,
      bodyValid: false,
      formValid: false
    };
  }

  onStateUpdated = (name, value) => { this.validateField(name, value) };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value },
      this.onStateUpdated(name, value));
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, body } = this.state;
    const author = this.props.username;

    this.props.createBlog(JSON.stringify({ title, author, body }), () => {
      this.props.history.push("/blogs");
    });
  }

  validateField(fieldName, value) {
    let { formErrors, titleValid, bodyValid } = this.state;

    switch (fieldName) {
      case 'title':
        titleValid = value.length >= Constants.MIN_LENGTH && value.length <= Constants.MAX_LENGTH;
        formErrors.title = titleValid ? '' : ' is invalid';
        break;
      case 'body':
        bodyValid = value.length > Constants.ZERO_LENGTH;
        formErrors.body = bodyValid ? '' : ' is invalid';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: formErrors,
      titleValid: titleValid,
      bodyValid: bodyValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.titleValid && this.state.bodyValid });
  }

  errorClass(error) {
    return (error.length === Constants.ZERO_LENGTH ? '' : 'has-error');
  }

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h2> Add Blog</h2>
        <div className="flex two center">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className="flex two center">
          <form onSubmit={this.onSubmit}>
            <FormElement errorElement={this.state.formErrors.title} element={title} name='title' onChange={this.onChange} />
            <FormElement errorElement={this.state.formErrors.author} element={this.props.username} name='author' disable="true" />
            <FormElement errorElement={this.state.formErrors.body} element={body} name='body' onChange={this.onChange} />
            <button type="submit" disabled={!this.state.formValid} className="btn btn-default">Submit</button>
            <Link to="/blogs" className="button back"><span aria-hidden="true"></span> Back </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.username
})

const mapDispatchToProps = (dispatch) => ({
  createBlog: (values, callback) => dispatch(blogActions.createBlog(values, callback)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Create);