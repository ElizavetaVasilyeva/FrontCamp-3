import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormErrors from '../errors/formErrors';
import Constants from '../../helpers/constants';
import FormElement from '../formElements/formElement';
import './create.css';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      body: '',
      formErrors: { title: '', author: '', body: '' },
      titleValid: false,
      authorValid: false,
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

    const { title, author, body } = this.state;

    fetch('/blogs', {
      method: 'POST',
      mode: 'CORS',
      body: JSON.stringify({ title, author, body }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.props.history.push("/blogs")
    }).catch(err => err);
  }

  validateField(fieldName, value) {
    let { formErrors, titleValid, authorValid, bodyValid } = this.state;

    switch (fieldName) {
      case 'title':
        titleValid = value.length >= Constants.MIN_LENGTH && value.length <= Constants.MAX_LENGTH;
        formErrors.title = titleValid ? '' : ' is invalid';
        break;
      case 'author':
        authorValid = value.match(Constants.ONLY_LETTERS_REGEX);
        formErrors.author = authorValid ? '' : ' is invalid';
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
      authorValid: authorValid,
      bodyValid: bodyValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.titleValid && this.state.authorValid && this.state.bodyValid });
  }

  errorClass(error) {
    return (error.length === Constants.ZERO_LENGTH ? '' : 'has-error');
  }

  render() {
    const { title, author, body } = this.state;
    return (
      <div>
        <h2> Add Blog</h2>
        <div className="flex two center">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className="flex two center">
          <form onSubmit={this.onSubmit}>
            <FormElement errorElement={this.state.formErrors.title} element={title} name='title' onChange={this.onChange} />
            <FormElement errorElement={this.state.formErrors.author} element={author} name='author' onChange={this.onChange} />
            <FormElement errorElement={this.state.formErrors.body} element={body} name='body' onChange={this.onChange} />
            <button type="submit" disabled={!this.state.formValid} className="btn btn-default">Submit</button>
            <Link to="/blogs" className="button back"><span aria-hidden="true"></span> Back </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;