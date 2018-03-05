import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormErrors from '../errors/formErrors';
import Constants from '../../helpers/constants';
import FormElement from '../formElements/formElement';
import './edit.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import * as blogActions from '../../store/actions/blog'
import Loader from 'react-loader'

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

  static propTypes = {
    getBlog: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
  }

  static defaultProps = {
    blog: {}
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBlog(id);
  }

  onStateUpdated = (name, value) => { this.validateField(name, value) };

  onChange = (e) => {
    const { name, value } = e.target;
    const state = this.props.blog
    state[name] = value;
    this.setState({ blog: state },
      this.onStateUpdated(name, value));
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, author, body } = this.props.blog;
    const { id } = this.props.match.params;

    this.props.editBlog(id, JSON.stringify({ title, author, body }), () => {
      this.props.history.push("/blog/" + id)
    });
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
    return (
      <Loader loaded={this.props.blog}>
        <div>
          <h2> Edit Blog</h2>
          <div className="flex two center">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <div className="flex two center">
            <form onSubmit={this.onSubmit}>
              <FormElement errorElement={this.state.formErrors.title} element={this.props.blog.title} name='title' onChange={this.onChange} />
              <FormElement errorElement={this.state.formErrors.author} element={this.props.blog.author} name='author' onChange={this.onChange} />
              <FormElement errorElement={this.state.formErrors.body} element={this.props.blog.body} name='body' onChange={this.onChange} />
              <button type="submit" disabled={!this.state.formValid} className="btn btn-default">Submit</button>
              <Link to={`/blog/${this.props.blog._id}`} className="button back"><span aria-hidden="true"></span> Back</Link>
            </form>
          </div>
        </div>
      </Loader>
    );
  }
}

const mapStateToProps = ({ blogs }, ownProps) => ({
  blog: blogs[ownProps.match.params.id]
})


const mapDispatchToProps = (dispatch) => ({
  getBlog: (id) => dispatch(blogActions.getBlog(id)),
  editBlog: (id, values, callback) => dispatch(blogActions.editBlog(id, values, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit);