import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormErrors from '../errors/formErrors'
import './edit.css';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blog: {
        title: '',
        author: '',
        body: ''
      },
      formErrors: { title: '', author: '', body: '' },
      titleValid: true,
      authorValid: true,
      bodyValid: true,
      formValid: true
    };
  }

  componentDidMount() {
    fetch('/blogs/' + this.props.match.params.id)
      .then(res => res.json())
      .then(blog => {
        this.setState({ blog });
      });
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const state = this.state.blog
    state[name] = value;
    this.setState({ blog: state }, () => { this.validateField(name, value) });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, author, body } = this.state.blog;

    fetch('/blogs/' + this.props.match.params.id, {
      method: 'PUT',
      mode: 'CORS',
      body: JSON.stringify({ title, author, body }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.props.history.push("/blog/" + this.props.match.params.id)
    }).catch(err => err);
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let titleValid = this.state.titleValid;
    let authorValid = this.state.authorValid;
    let bodyValid = this.state.bodyValid;

    switch (fieldName) {
      case 'title':
        titleValid = value.length >= 3 && value.length <= 100;
        fieldValidationErrors.title = titleValid ? '' : ' is invalid';
        break;
      case 'author':
        authorValid = value.match(/^[a-zA-Z]+$/);
        fieldValidationErrors.author = authorValid ? '' : ' is invalid';
        break;
      case 'body':
        bodyValid = value.length > 0;
        fieldValidationErrors.body = bodyValid ? '' : ' is invalid';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      titleValid: titleValid,
      authorValid: authorValid,
      bodyValid: bodyValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.titleValid && this.state.authorValid && this.state.bodyValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  render() {
    return (
      <div>
        <h2> Edit Blog</h2>
        <div className="flex two center">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className="flex two center">
          <form onSubmit={this.onSubmit}>
            <div className={`form-group ${this.errorClass(this.state.formErrors.title)}`}>
              <label>Title:</label>
              <input type="text" className="form-control" name="title" value={this.state.blog.title} onChange={this.onChange} placeholder="Title" />
            </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.author)}`}>
              <label>Author:</label>
              <input type="text" className="form-control" name="author" value={this.state.blog.author} onChange={this.onChange} placeholder="Author" />
            </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.body)}`}>
              <label>Body:</label>
              <textarea className="form-control" value={this.state.blog.body} name="body" onChange={this.onChange} placeholder="Body" cols="80" rows="10" />
            </div>
            <button type="submit" disabled={!this.state.formValid} className="btn btn-default">Submit</button>
            <Link to={`/blog/${this.state.blog._id}`} className="button back"><span aria-hidden="true"></span> Back</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Edit;